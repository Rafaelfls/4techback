class Job{
    constructor(id, name, salary, description, skills, area, diferentials, isPcd, isActive){
        this.id = id
        this.name=name
        this.salary=salary
        this.description=description
        this.skills=skills
        this.area=area
        this.diferentials=diferentials
        this.isActive=isActive
        this.isPcd=isPcd
    }
}

module.exports = {Job}