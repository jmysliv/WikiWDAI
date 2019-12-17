import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v){
            return /\S+@\S+\.\S+/.test(v)
        }
    } 
    },
    password: {
      type: String,
      required: true
    },
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