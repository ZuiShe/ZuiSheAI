import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

// ============== 控制器 ==============
@Controller()
class AppController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get('/health')
  health() {
    return {
      status: 'ok',
      service: 'zuishe-backend',
      time: new Date().toISOString(),
    };
  }

  @Get('/')
  root() {
    return {
      message: 'zuishe.com.cn API 服务运行中',
      version: '1.0.0',
      docs: 'https://be.zuishe.com.cn/health',
    };
  }

  // ============ 业务 API：用原生 SQL，避免 TypeORM 实体同步问题 ============

  @Get('/api/products')
  async getProducts() {
    try {
      const rows = await this.dataSource.query(
        `SELECT id, spu_name, spec, unit, alcohol_content, status, cover_image
         FROM spu
         ORDER BY id ASC
         LIMIT 10`,
      );
      return {
        success: true,
        count: rows.length,
        data: rows,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Get('/api/categories')
  async getCategories() {
    try {
      const rows = await this.dataSource.query(
        `SELECT c.id, c.cat_name, COUNT(s.id) AS product_count
         FROM category c
         LEFT JOIN spu s ON s.category_id = c.id
         GROUP BY c.id, c.cat_name
         ORDER BY c.id`,
      );
      return {
        success: true,
        count: rows.length,
        data: rows,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Get('/api/stats')
  async getStats() {
    try {
      const stats = await this.dataSource.query(`
        SELECT
          (SELECT count(*) FROM spu) AS total_products,
          (SELECT count(*) FROM brand) AS total_brands,
          (SELECT count(*) FROM category) AS total_categories,
          (SELECT count(*) FROM supplier_product) AS total_supplier_products
      `);
      return {
        success: true,
        data: stats[0],
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  // ========== 图片代理（绕过中文路径 URL 编码问题）==========
  @Get('/api/image')
  async serveImage(@Query('p') relativePath: string, @Res() res: any) {
    if (!relativePath) {
      return res.status(400).json({ success: false, error: '缺少 p 参数' });
    }
    // 防止路径遍历攻击
    const safe = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join('/app/uploads', safe);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: '文件不存在' });
    }
    // 根据扩展名设置 Content-Type
    const ext = path.extname(filePath).toLowerCase();
    const mime: Record<string, string> = {
      '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
      '.png': 'image/png', '.gif': 'image/gif',
      '.webp': 'image/webp', '.bmp': 'image/bmp',
    };
    res.set('Content-Type', mime[ext] || 'application/octet-stream');
    res.set('Cache-Control', 'public, max-age=86400');
    fs.createReadStream(filePath).pipe(res);
  }
}

// ============== 模块 ==============
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST', 'postgres'),
        port: parseInt(cfg.get('DB_PORT', '5432'), 10),
        username: cfg.get('DB_USER'),
        password: cfg.get('DB_PASSWORD'),
        database: cfg.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://app.zuishe.com.cn',
      'https://be.zuishe.com.cn',
    ],
    credentials: true,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`[zuishe-backend] 已启动 → http://0.0.0.0:${port}`);
}

bootstrap();