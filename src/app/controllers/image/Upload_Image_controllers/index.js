
class UploadImageControllers {
    
    async upload(req, res,next) {
        try {
            const fileData = req.file
            console.log(fileData)
            return res.status(200).json({
                            status: 200,
                            message: "Image Uploaded Successfully",
                            data: fileData
                        })
        }
        catch (error) {

        }
    };
}
module.exports = new UploadImageControllers;