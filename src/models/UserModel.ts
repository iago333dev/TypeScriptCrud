import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt'

export interface UserInterface extends Document {
    email: String,
    password: String
    comparePassword: (password:string) => Promise<boolean>

}


//Define DATABASE format
const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true

    },
    password:{
        type: String,
        required: true,
    }
});

//Verificação antes de salvar Usuario <:>
// Gera HASH de senha <:>
UserSchema.pre<UserInterface>('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

//Verifica HASH de senha <:>
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<UserInterface>('User', UserSchema);