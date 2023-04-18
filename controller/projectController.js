const projectSc = require("../schema/project_schema");
const user_schema = require("../schema/user_schema");

exports.createProject = async (req, res) => {
    const { pname, pimage, plogo, pdesc, stack, gitHub, pUrl, ownerId, isPrivate, isGroup, groupArray, branch, domain, year, status, rating } = req.body;
    try {
        let project = await projectSc.create({ pname, pimage, plogo, pdesc, stack, gitHub, pUrl, ownerId, isPrivate, isGroup, groupArray, branch, domain, year, status, rating });
        console.log(project);
        res.status(200).json({
            message: "Successfully created project",
            project
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong "
        })
    }
}


exports.deleteProject = async (req, res) => {
    let id = req.params.id;

    if (id === "all") {
        const data = await projectSc.deleteMany({});
        res.status(200).send({
            data
        });
    }
    else {

        try {
            const data = await projectSc.findByIdAndDelete(id);
            res.json({
                "status_code": 204,
                "status": `Deleted the project ${data.pname} with id ${data.id} from db`,
            });
        }
        catch (error) {
            console.log(error);
            res.status(404).json({
                message: "Not found "
            })
        }
    }
}

exports.updateProject = async (req, res) => {
    // update api using patch

    let id = req.params.id;
    let updatedData = req.body;

    let options = { new: true };

    try {
        const data = await projectSc.findByIdAndUpdate(id, updatedData, options);

        res.status(201).send(data);
    } catch (error) {
        res.status().send(error.message);
    }
}

exports.getProject = async (req, res) => {

    let id = req.params.id;

    if (id === "all") {
        let data = await projectSc.find();
        res.status(200).json(data);
    }
    else {
        console.log(id);
        let data = await projectSc.findOne({ _id: id });
        if (data == null) {
            res.status(400).send({
                "message": "Invalid id"
            })
        }
        try {
            res.status(200).send(data);

        } catch (error) {
            res.status(500).send({
                "message": "Something went wrong..."
            })
        }

    }
}

exports.filterProject = async (req, res) => {
    const filterTag = {};
    try {
        switch (Object.keys(req.query)[0]) {
            case "pname": {
                if (req.query.pname) {
                    filterTag["pname"] = req.query.pname;
                }
            }
            case "branch": {
                if (req.query.branch) {
                    filterTag["branch"] = req.query.branch;
                }
            }
            case "domain": {
                if (req.query.domain) {
                    filterTag["domain"] = req.query.domain;
                }
            }
            case "stack": {
                if (req.query.stack) {
                    const stack = req.query.stack.split(',');
                    filterTag["stack"] = stack;
                }
            }
            case "rating": {
                if (req.query.rating) {
                    var rating = req.query.rating;
                    filterTag["pname"] = rating;
                }
            }

            case "year":
                if (req.query.year) {
                    filterTag["year"] = req.query.year;
                }

            case "status":
                if (req.query.isGroup) {
                    filterTag["status"] = req.query.status;
                }

            case "username":
                if (req.query.username) {
                    console.log(req.query.username);
                    const username = req.query.username;
                    var user = await user_schema.findOne({ username });
                    const ownerId = user._id.toString();
                    console.log(ownerId);
                    filterTag["ownerId"] = ownerId;
                }

        }
        console.log(filterTag);
        projectSc.find(filterTag).then((docs) => {
            res.status(200).send(docs);

        }).catch((err) => {
            console.log(err);
        });

    } catch (error) {
        res.status(400)
            .send(error)
    }
}


