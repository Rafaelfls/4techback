// como nao usamos o moedelo em função do firebase, pode apagar
// const jobModel = require('../../models/job')

// let collectionJobs = []


// const validateToken = require('../../config/security/tokenValidator')



module.exports = routes => {

    const db = routes.config.firebaseConfig.collection('jobs')

    // retorna todos os jobs    
    routes.get('/jobs', /*validateToken,*/ async (req, res) => {
        //sem o firebase
        // res.send(collectionJobs)

        //com o firebase
        try {
            let docs = await db.get()
            let jobs = []

            docs.forEach(doc => {
                jobs.push(extractJob(doc))
            })

            return res.send(jobs)

        } catch (error) {
            return res.status(500).send(error)
        }
    })

    // retorna o job por id
    routes.get('/jobs/:jobId', async (req, res) => {
        // sem o fireBase
        // let job = collectionJobs.find(job => job.id == req.params.jobId)
        // if (job) {
        //     res.send(job)
        // } else {
        //     res.status(204).send('Job not found')
        // }

        // com fireBase
        try {
            // passa o documento como referencia e com o .get ele pega toda a informação do job
            let job = await db.doc(req.params.jobId).get()

            if (job.exists) {
                return res.send(extractJob(job))
            } else {
                return res.status(404).send('Job not found!')
            }
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    //acrescenta novos jobs
    routes.post('/jobs', async (req, res) => {
        // try {
        //     let job = new jobModel.Job(
        //         req.body.id,
        //         req.body.name,
        //         req.body.salary,
        //         req.body.description,
        //         req.body.skills,
        //         req.body.area,
        //         req.body.diferentials,
        //         req.body.isPcd,
        //         req.body.isActive
        //     )
        //     collectionJobs.push(job)
        //     res.send(job)
        // } catch (error) {
        //     res.status(500).send(error)
        // }

        try {
            await db.doc().set(req.body)

            return res.send('Job added successfuly!')
            
        } catch (error) {
            return res.status(500).send(error)            
        }

    })

    // atualiza infomração do job
    routes.put('/jobs/:jobId', async (req, res) => {
        //sem firebase
        // collectionJobs.forEach((job) => {
        //     if (job.id == req.params.idUsuario) {
        //         try {
        //             job.name = req.body.name,
        //             job.email = req.body.email,
        //             job.password = req.body.password

        //             res.send(job)

        //         } catch (error) {
        //             return res.status(500).send('Parametros invalidos!')
        //         }
        //     }

        try {
            await db.doc(req.params.jobId).update(req.body)
            return res.send(`A vaga ${req.params.jobId} foi atualizada com sucesso`)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    // deleta job pelo ID
    routes.delete('/jobs/:jobId', async (req, res) => {
        // sem firebase
        //     let jobExist = false

        //     collectionJobs.forEach((job, index) =>{
        //         if(job.id == req.params.jobId ){
        //             jobExist = true
        //             collectionJobs.splice(index, 1)

        //             res.send('ok')
        //         }
        //     })

        //     if(!jobExist)
        //         res.status(500).send(error)

        // com firebase
        try {
            await db.doc(req.params.jobId).delete(req.body)
            return res.send(`A vaga ${req.params.jobId} foi removida com sucesso`)
        } catch (error) {
            return res.status(500).send(error)
        }
    })

    
    // function extractJob (job){} sem arrow function
    extractJob = (job) => {
        let data = job.data()
        return {
            id: job.id,
            name: data.name,
            salary: data.salary,
            description: data.description,
            skills: data.skills,
            area: data.area,
            diferentials: data.diferentials,
            isActive: data.isActive,
            isPcd: data.isPcd
        }
    }

}