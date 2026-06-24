import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity, PrimaryColumn, Column, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// ============== 实体定义 ==============
@Entity('spu')
class Spu {
  @PrimaryColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'bigint' })
  category_id: string;

  @Column({ type: 'bigint', nullable: true })
  brand_id: string;

  @Column({ type: 'varchar', length: 200 })
  spu_name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  spec: string;

  @Column({ type: 'varchar', length: 20, default: '箱' })
  unit: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  cover_image: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  alcohol_content: number;

  @Column({ type: 'smallint', default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

// ============== 控制器 ==============
@Controller()
class AppController {
  constructor(
    @InjectRepository(Spu)
    private readonly spuRepo: Repository<Spu>,
  ) {}

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

  @Get('/api/products')
  async getProducts() {
    try {
      const products = await this.spuRepo.find({
        take: 10,
        order: { id: 'ASC' },
      });
      return {
        success: true,
        count: products.length,
        data: products,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }

  @Get('/api/categories')
  async getCategories() {
    try {
      const cats = await this.spuRepo.query(
        `SELECT id, category_id, COUNT(*) as product_count
         FROM spu
         GROUP BY id, category_id
         LIMIT 20`,
      );
      return {
        success: true,
        count: cats.length,
        data: cats,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
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
        entities: [Spu],
        synchronize: false,
        logging: ['error', 'warn'],
      }),
    }),
    TypeOrmModule.forFeature([Spu]),
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