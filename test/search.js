
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

async function search() {
    const milvusClient = new MilvusClient({
        address: 'localhost:19530',
    });

    const useDb = await milvusClient.use({ db_name: 'test' });
    console.log('New Database is using:', useDb);

    await milvusClient.loadCollectionSync({ collection_name: 'sample_collection' });

    const search = await milvusClient.search({
        collection_name: 'sample_collection', // 查询的集合名
        vector: [1,2,3,4,5,6,7,8],            // 查询的目标向量
        filter: 'age > 0',                    // 过滤条件
        output_fields: ['name', 'age'],       // 返回的字段
        limit: 5,                             // 返回的结果数量限制 topK K = 5
    });

    //  The smaller the result score, the higher the similarity
    // query result {
    //     status: {
    //         extra_info: {},
    //         error_code: 'Success',
    //             reason: '',
    //             code: 0,
    //             retriable: false,
    //             detail: ''
    //     },
    //     results: [
    //         {
    //             score: 158.702880859375,
    //             id: '454033228717804176',
    //             age: '454033228717804176',
    //             name: '5lr9y'
    //         },
    //         {
    //             score: 160.5952606201172,
    //             id: '454033228717804180',
    //             age: '454033228717804180',
    //             name: 'sb7mt'
    //         },
    //         {
    //             score: 160.8597412109375,
    //             id: '454033228717804175',
    //             age: '454033228717804175',
    //             name: 'zlnmh'
    //         },
    //         {
    //             score: 161.89508056640625,
    //             id: '454033228717804177',
    //             age: '454033228717804177',
    //             name: 'nes0j'
    //         },
    //         {
    //             score: 162.5283660888672,
    //             id: '454033228717804178',
    //             age: '454033228717804178',
    //             name: 'ct2li'
    //         }
    //     ]
    // }


    console.log('query result', search);

}

search();
