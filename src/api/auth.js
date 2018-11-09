import util from '../libs/util'


let login = () => {
    return util.ajax.post('/auth/login')
}

export default {
    login
}