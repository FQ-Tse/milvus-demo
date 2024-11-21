import { MilvusClient } from '@zilliz/milvus2-sdk-node';

async function query() {
    const milvusClient = new MilvusClient({
        address: 'localhost:19530',
    });

    const useDb = await milvusClient.use({ db_name: 'test' });
    console.log('New Database is using:', useDb);


    const load = await milvusClient.loadCollectionSync({ collection_name: 'sample_collection' });

    const query = await milvusClient.query({
        collection_name: 'sample_collection',
        filter: 'age > 0',
        output_fields: ['age', 'vector'],
        limit: 100,
    });
    console.log('query result', query);

}

query();
