import { Module } from '@nestjs/common';
import { TodoListModule } from './todoList/todoList.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/MongooseConfigService';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import configuration2 from './config2/configuration2';
import { MongooseConfigService2 } from './config2/MongooseConfigService2';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    TodoListModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService2,
    }),
    ConfigModule.forRoot({
      load: [configuration, configuration2],
      expandVariables: true,
    }),
    JwtModule.register({
      secret: 'your-jwt-secret',
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
