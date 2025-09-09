import axios from "axios"

const baseUrl = "https://linked-posts.routemisr.com/"

export async function getAllPostsApi(page = 1) {


    try {
        const { data } = await axios.get(baseUrl + "posts", {
            headers: {
                token: localStorage.getItem("token")
            },
            params: {
                limit:40,
                page,
                sort: "-createdAt"
            }
        })
        return data;

    } catch (error) {
        return error?.response?.data;
    }

}

export async function getSinglePostApi(postId) {
    try {
        const { data } = await axios.get(baseUrl + "posts/" + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    } catch (error) {
        console.log(error.response.data);

    }
}

export async function addPost(formData) {
    try {
        const { data } = await axios.post(baseUrl + "posts", formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    } catch (error) {
        console.log(error.response.data);

    }
}
export async function deletePost(postId) {
    try {
        const { data } = await axios.delete(baseUrl + "posts/" + postId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    } catch (error) {
        console.log(error.response.data);

    }
}

export async function updatePost(postsId, newFormData) {
    try {
        const { data } = await axios.put(baseUrl + "posts/" + postsId, newFormData,
        {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    } catch (error) {
        return error.response.data;

    }
}