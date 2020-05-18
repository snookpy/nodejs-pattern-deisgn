
import * as dogDB from './dogDB';

import * as dogController from './dogController'

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest: any = (req: any = {}) => {
    console.log("request: ", req)
    return req
}

describe("first test", () => {
    it('add', () => {
        let result = 3 +3
        expect(result).toBe(7)
    })
})

describe("dog controller", () => {
    describe("get all dog", () => {
        let fetchAllDogSpy: any;

        beforeEach(() => {
            fetchAllDogSpy = jest.spyOn(dogDB, 'fetchAllDog')
        })

        afterEach(() => {
            fetchAllDogSpy.mockRestore()
        })

        it('get all dog successfully, should return dogs', async () => {
            const req = mockRequest()
            const res = mockResponse()
            fetchAllDogSpy = fetchAllDogSpy.mockResolvedValue(dogDB.EXAMPLE)

            await dogController.getAllDog(req, res)

            expect(res.json).toHaveBeenCalledWith(dogDB.EXAMPLE)

        })

        it('get all dog successfully, should return dogs (2)', async () => {
            const req = mockRequest()
            const res = mockResponse()
            const twoDog = dogDB.EXAMPLE.filter(d => d.id !== "1")
            fetchAllDogSpy = fetchAllDogSpy.mockResolvedValue(twoDog)

            await dogController.getAllDog(req, res)

            expect(res.json).toHaveBeenCalledWith(twoDog)
        })
        it('get all dog fail, should return status 500', async () => {
            const req = mockRequest()
            const res = mockResponse()

            fetchAllDogSpy = fetchAllDogSpy.mockRejectedValue("error")

            await dogController.getAllDog(req,res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })
})