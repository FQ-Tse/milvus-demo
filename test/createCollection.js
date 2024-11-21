import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

async function createCollection() {
    const milvusClient = new MilvusClient({
        address: 'localhost:19530',
    });

    console.log("Connection status: " + milvusClient.connectStatus)

    await milvusClient.use({ db_name: 'test' });

    const create = await milvusClient.createCollection({
        collection_name: 'sample_collection',
        fields: [
            {
                name: 'id',              // 字段名
                description: 'ID field', // 字段描述
                data_type: DataType.Int64, // 数据类型为 Int64
                is_primary_key: true,     // 设置为主键
                autoID: true,             // 自动生成 ID
            },
            {
                name: 'vector',
                description: 'Vector field', // 字段描述
                data_type: DataType.FloatVector, // 数据类型为浮点向量
                dim: 8,                     // 向量维度为 8
            },
            {
                name: 'height',
                description: 'int64 field', // 字段描述
                data_type: DataType.Int64,  // 数据类型为 Int64
            },
            {
                name: 'age',
                description: 'int64 field', // 字段描述
                data_type: DataType.Int32,  // 数据类型为 Int64
            },
            {
                name: 'name',
                description: 'VarChar field', // 字段描述
                data_type: DataType.VarChar,  // 数据类型为字符串
                max_length: 128,              // 最大长度为 128
            },
        ],
    });


    const describeCollection = await milvusClient.describeCollection({ collection_name: 'sample_collection'});

    console.log('describe collection', describeCollection);
}

createCollection();
