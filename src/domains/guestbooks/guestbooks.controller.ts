import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { DAccount } from 'src/decorator/account.decorator';
import { Private } from 'src/decorator/private.decorator';
import { CreateGuestbookDto, UpdateGuestbookDto } from './guestbooks.dto';
import { GuestbooksService } from './guestbooks.service';

@Controller('guestbooks')
export class GuestbooksController {
  constructor(private readonly guestbooksService: GuestbooksService) {}

  // @TODO: 방명록 목록 조회
  @Get()
  findAll() {
    return this.guestbooksService.findAll();
  }

  // @TODO: 방명록 단건 조회
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestbooksService.findOne(id);
  }

  // @TODO: 방명록 생성
  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  @Private('user')
  create(
    @DAccount('user') user: User,
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createGuestbookDto: CreateGuestbookDto,
  ) {
    const { id: userId } = user;

    return this.guestbooksService.create(userId, imageFile, createGuestbookDto);
  }

  // @TODO: 방명록 작성
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuestbookDto: UpdateGuestbookDto,
  ) {
    return this.guestbooksService.update(id, updateGuestbookDto);
  }

  // @TODO: 방명록 삭제
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.guestbooksService.delete(id);
  }
}
