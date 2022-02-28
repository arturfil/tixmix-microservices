import { Schema, model } from 'mongoose';
import { Password } from '../services/Password';

export interface User {
    email: string;
    password: string;
}

const UserSchema = new Schema<User>({
    email: {type: String, required: true},
    password: { type: String, required: true}
})

UserSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

export const UserModel = model<User>('User', UserSchema);

