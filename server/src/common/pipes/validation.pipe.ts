import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    /**
     * This method is used to transform the incoming data.
     * 
     * @param value any
     * @param metatype ArgumentMetadata
     * @returns any
     * 
     * @throws BadRequestException
     */
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object  = plainToInstance(metatype, value);
        const errors  = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed', errors.toString());
        }
        return object;
    }

    /**
     * This method is used to check if the metatype is a valid type.
     * 
     * @param metatype Any
     * @returns boolean
     */
    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}