import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
  // await app.listen(process.env.PORT || 3000, function(){
  //   console.log("Express server listening on port %d ", this.address().port);
  // });
  
}
bootstrap();
