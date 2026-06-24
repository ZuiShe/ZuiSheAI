import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Controller()
class AppController {
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
}

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
  // 允许跨域（uni-app 小程序和 H5 都需要）
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