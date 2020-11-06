import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CoordinatesDTO {
    @ApiProperty()
    x: number;

    @ApiProperty()
    y: number;
}

class EnemiesDTO {
    @ApiProperty({ enum: ['soldier', 'mech'] })
    type: string;

    @ApiProperty()
    number: number;
}

class ScanDTO {
    @ApiProperty()
    coordinates: CoordinatesDTO;

    @ApiProperty()
    enemies: EnemiesDTO;

    @ApiPropertyOptional()
    allies: number;
}

export class EnvironmentDTO {
    @ApiProperty()
    protocols: string[];

    @ApiProperty()
    scan: ScanDTO[];
}
