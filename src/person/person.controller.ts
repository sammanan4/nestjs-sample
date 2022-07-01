import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    Res,
} from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { Request, Response } from 'express';
import { PersonService } from './person.service';
import { Person } from './interfaces/person.interface';


@Controller('person')
export class PersonController {

    constructor(private readonly personService: PersonService) { }

    @Get()
    findAll(): Promise<Person[]> {
        return this.personService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Person> {
        return this.personService.findOne(id)
    }


    @Post()
    addPerson(@Body() person: PersonDto): Promise<PersonDto> {
        return this.personService.create(person)
    }

    @Put(':id')
    updatePerson(@Param('id') id: string, @Body() person: PersonDto): Promise<PersonDto> {
        return this.personService.findAndUpdate(id, person)
    }

    @Delete(':id')
    deletePerson(@Param('id') id: string): Promise<PersonDto> {
        return this.personService.findAndDelete(id)
    }



    @Get('random/:id')
    getRandomResponse(
        @Param() pathParams: any,
        @Query('hello', ParseBoolPipe) helloQueryParam: boolean,
        @Req() request: Request,
        @Res() response: Response,
    ): any {
        return response.json({
            pathParams,
            helloQueryParam,
            url: request.url,
            path: request.path,
        });
    }
}
