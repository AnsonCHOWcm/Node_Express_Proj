const Products = require('../models/product')

const getAllProductStatic = async (req, res) => {
    const product = await Products.find({
        featured : true
    })
    res.status(200).json({product, nbHits : product.length})
} 

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, field, numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === true ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    
    if(numericFilters){
        const operationMap = {
            '>':'$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(>|<|>=|<=|=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operationMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operation, thres] = item.split('-')
            if (options.includes(field)){
                queryObject[field] = {[operation]: Number(thres)}
            }
        })
    }

    
    let result = Products.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createAt')
    }
    if (field){
        const fieldList = field.split(',').join(' ')
        result = result.select(fieldList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)
    const product = await result
    res.status(200).json({product, nbHits : product.length})
}

module.exports = {
    getAllProductStatic,
    getAllProducts,
}