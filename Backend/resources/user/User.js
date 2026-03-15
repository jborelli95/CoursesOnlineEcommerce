export default {
    api_resource_user: async(user) => {
        return{
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            description: user.description,
            rol: user.rol,
            avatar: process.env.URL_BACKEND + "api/users/user-image" + user.avatar,
        }
    },
}