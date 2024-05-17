import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class AuthCredentialRegister {
    @IsNotEmpty()
    @Length(18)
    public CURP: string;

    @IsNotEmpty()
    @Length(8,13)
    public password:string;

    @IsNotEmpty()
    @Length( 12)
    public name: string;

    @IsNotEmpty()
    @Length(12)
    public lastname: string;

    @IsNotEmpty()
    @Length(7,13)
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @Length(13)
    public state: string;

    @IsNotEmpty()
    @Length(13)
    public city: string;

    @IsNotEmpty()
    @Length(5)
    public zip_code: number;

    constructor(CURP:string, password:string, name:string, lastname:string, email:string, state:string, city:string, zip_code:number){
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
