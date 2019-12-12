import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
  });

userSchema.methods.getUnifiedUser = function () {
    let user = this.toJSON();
    user.id = this._id;
    delete user._id;
    return user; 
}
const UserModel = mongoose.model('Users', userSchema);
mongoose.set('useFindAndModify', false);

export default UserModel;