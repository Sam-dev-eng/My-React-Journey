import api from "./axios";

export const createGig = async (gigDetails) => {
    const response = await api.post("/gigs/creates", gigDetails)
    //console.log(response);
    return response.data;
}

export const viewAllGigs = async () => {
    const response = await api.get("/gigs/viewAllGigs");
    //console.log(response);
    return response;
}

export const searchGigs = async (query,page) => {
            const response = await api.get(
                `/gigs/search`,
                {
                    params: {
                        query,
                        page,
                        size: 10
                    }
                }
                )
    return response;
                }