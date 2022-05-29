import axios from 'axios';


export const getAll = async (path: string = '', payload: any = null) => {
    try {

        const options = {
            params: {
                ...payload
            }
        }
        
        const res = await axios.get('/api/' + path, options)
        
        return res.data;

    } catch (err: any) {
        console.log(err.message);
    }
}
export const getOneById = async (path: string = '', dispatch: any) => {
    try {

        const { payload } = dispatch;

        const res = await axios.get('/api/' + path + '/' + payload.id)

        return res.data;

    } catch (err: any) {
        console.log(err.message);
    }
}

export const updateById = async (path: string = '', dispatch: any) => {
    try {

        const { payload, action } = dispatch;
        
        
        const options = {
            params: {
                action
            }
        }
        console.log(options)

        const res = await axios.put('/api/' + path + '/' + payload.id, payload, options)

        return res.data;

    } catch (err: any) {
        console.log(err.message);
    }
}