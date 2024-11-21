import { MilvusClient } from '@zilliz/milvus2-sdk-node';

async function createIndex() {
    const milvusClient = new MilvusClient({
        address: 'localhost:19530',
    });

    const useDb = await milvusClient.use({ db_name: 'test' });
    console.log('New Database is using:', useDb);

    const createIndex = await milvusClient.createIndex({
        collection_name: 'sample_collection',
        field_name: 'vector',
        metric_type: 'L2',
    });

    console.log(createIndex)

}

createIndex();
