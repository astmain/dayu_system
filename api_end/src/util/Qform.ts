import {
    createParamDecorator,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';

interface FieldConfig {
    name: string;
    type?: 'string' | 'int' | 'float';
    required?: boolean;
    source?: 'query' | 'param' | 'header';
}

export const Qform = createParamDecorator(
    (fields: FieldConfig[], ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const result: any = {};

        for (const field of fields) {
            const source = field.source || 'query';
            const raw =
                source === 'query'
                    ? request.query[field.name]
                    : source === 'param'
                        ? request.params[field.name]
                        : request.headers[field.name];

            if (raw === undefined || raw === '') {
                if (field.required !== false) {
                    throw new BadRequestException(`参数 ${field.name} 缺失`);
                } else {
                    result[field.name] = undefined;
                    continue;
                }
            }

            const valueStr = String(raw).trim();

            let value: any = valueStr;
            if (field.type === 'int') {
                console.log(`111---valueStr:`,     valueStr        )
                if (!isPureNumberByRegex(valueStr)) throw new BadRequestException(`${field.name} 不是有效的整数--${valueStr}`);
                value = parseInt(valueStr, 10);
            } else if (field.type === 'float') {
                if (!isPureNumberByRegex(valueStr)) throw new BadRequestException(`${field.name} 不是有效的整数--${valueStr}`);
                value = parseFloat(valueStr);

            }

            result[field.name] = value;
        }

        return result;
    },
);


function isPureNumberByRegex(str) {
    return /^\d+$/.test(str);
}