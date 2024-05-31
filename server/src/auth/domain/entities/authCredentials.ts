import { IsEmail, IsNotEmpty, Length, Max, Min } from "class-validator";

export class AuthCredentialRegister {
    @IsNotEmpty()
    @Length(18)
    public CURP: string;

    @IsNotEmpty()
    @Length(8, 16)
    public password: string;

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public lastname: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public state: string;

    @IsNotEmpty()
    public city: string;

    @IsNotEmpty()
    public zip_code: number;


    constructor(CURP: string, password: string, name: string, lastname: string, email: string, state: string, city: string, zip_code: number) {
            this.CURP = CURP,
            this.password = password,
            this.name = name,
            this.lastname = lastname,
            this.email = email,
            this.state = state,
            this.city = city,
            this.zip_code = zip_code
    }
}

export class AuthCredentialLogin {
    @IsNotEmpty()
    @Length(18)
    CURP: string

    @IsNotEmpty()
    @Length(8, 16)
    password: string



    constructor(CURP: string, password: string) {
        this.CURP = CURP,
        this.password = password
    }
}
