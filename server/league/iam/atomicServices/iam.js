var bcrypt = require('bcrypt');
const { dbErrorHandling } = require('../../../utility/error/dbError');
const { User } = require('../model/iam');


const register = async (name, family, sex, age, graduation, graduationField, nationalId, personnelId, companyName,companyNamePer, organizationLevel, mobile, email, type, username, password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        let user = await User({
            name, family, sex, age, graduation, graduationField, nationalId, personnelId, companyName,companyNamePer, organizationLevel, mobile, email, type, username, password: hashPassword, authorities: []
        });
        return await user.save();

    } catch (error) {
        await dbErrorHandling(error);
    }
};

const isUsernameExists = async (username) => {  
    
     return await User.findOne({ username }).collation({locale: "en", strength: 2});
   // return await User.findOne({ username : username.tolowercase() });
    
}

const isEmailExists = async (email) => {
    return await User.findOne({ email });
}

/////--------not chacked -------------------
const loadUser = async (name, family, sex, graduation, nationalId, personnelId, companyName, username) => {
    try {
        const query = {};
        if (name) query.name = { $regex: `.*${name}.*` };
        if (family) query.family = { $regex: `.*${family}.*` };
        if (sex) {
            if (sex = "true") query.sex = true;
            if (sex = "false") query.sex = false;
        }
        if (graduation) query.graduation = graduation;
        if (nationalId) query.nationalId = nationalId;
        if (personnelId) query.personnelId = personnelId;
        if (companyName) query.companyName = { $regex: `.*${companyName}.*` };
        if (username) query.username = username;
        return await User.find(query);
    } catch (error) {
        await dbErrorHandling(error);
    }
}

const loadUserById = async (userId) => {
    try {
        return await User.findById({ _id: userId })
    } catch (error) {
        await dbErrorHandling(error)
    }
}

const deleteUser = async (userId) => {
    try {
        return await User.findByIdAndDelete({ _id: userId });
    } catch (error) {
        await dbErrorHandling(error);
    }
}


const updateUser = async (uesrId, name, family, sex, age, graduation, graduationField,
    nationalId, personnelId, companyName, organizationLevel, mobile, email,type,
    username, password) => {
    const inputFields = {};  
    if (name) inputFields.name = name;   
    if (family) inputFields.family = family;
    if (sex) inputFields.sex = sex;
    if (age) inputFields.age = age;
    if (graduation) inputFields.graduation = graduation;
    if (graduationField) inputFields.graduationField = graduationField;
    if (nationalId) inputFields.nationalId = nationalId;
    if (personnelId) inputFields.personnelId = personnelId;
    if (companyName) inputFields.companyName = companyName;
    if (organizationLevel) inputFields.organizationLevel = organizationLevel;
    if (mobile) inputFields.mobile = mobile;
    if (email) inputFields.email = email;
    if (type) inputFields.type = type;
    if (username) inputFields.username = username;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        inputFields.password = hashPassword;
    }
    const user = await User.findOneAndUpdate({_id: uesrId}, inputFields, {new: true});
    return user; 
}

const resetPassword = async (username) => {
    await User.findOneAndUpdate({username: username}, {resetPass: true});
}


const deleteUserByUsername = async (uesrname) => {
    try {
        return await User.deleteMany({ username: uesrname });
    } catch (error) {
        console.log(error);
        await dbErrorHandling(error);
    }
}


module.exports = { register, isUsernameExists, isEmailExists, loadUser, loadUserById, deleteUser, updateUser, resetPassword, deleteUserByUsername }