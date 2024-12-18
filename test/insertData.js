import { MilvusClient } from '@zilliz/milvus2-sdk-node';

async function insertData() {
    try {
        const milvusClient = new MilvusClient({
            address: 'localhost:19530',
        });
        console.log('Connection status: ' + milvusClient.connectStatus);

        const useDb = await milvusClient.use({ db_name: 'test' });
        console.log('New Database is using:', useDb);

        const vectorsData = [
            {
                vector: [
                    0.11878310581111173, 0.9694947902934701, 0.16443679307243175,
                    0.5484226189097237, 0.9839246709011924, 0.5178387104937776,
                    0.8716926129208069, 0.5616972243831446,
                ],
                height: 20405,
                age:1,
                name: 'zlnmh',
            },
            {
                vector: [
                    0.9992090731236536, 0.8248790611809487, 0.8660083940881405,
                    0.09946359318481224, 0.6790698063908669, 0.5013786801063624,
                    0.795311915725105, 0.9183033261617566,
                ],
                height: 93773,
                age:2,
                name: '5lr9y',
            },
            {
                vector: [
                    0.8761291569818763, 0.07127366044153227, 0.775648976160332,
                    0.5619757601304878, 0.6076543120476996, 0.8373907516027586,
                    0.8556140171597648, 0.4043893119391049,
                ],
                height: 85122,
                age:3,
                name: 'nes0j',
            },
            {
                vector: [
                    0.5849602436079879, 0.5108258101682586, 0.8250884731578105,
                    0.7996354835509332, 0.8207766774911736, 0.38133662902290566,
                    0.7576720055508186, 0.4393152967662368,
                ],
                height: 92037,
                age:4,
                name: 'ct2li',
            },
            {
                vector: [
                    0.3768133716738886, 0.3823259261020866, 0.7906232829855262,
                    0.31693696726284193, 0.3731715403499176, 0.3300751870649885,
                    0.22353556137796238, 0.38062799545615444,
                ],
                height: 31400,
                age:5,
                name: '6ghrg',
            },
            {
                vector: [
                    0.0007531778212483964, 0.12941566118774994, 0.9340164428788116,
                    0.3795768837758642, 0.4532443258064389, 0.596455163143,
                    0.9529469158782906, 0.7692465408044873,
                ],
                height: 1778,
                age:6,
                name: 'sb7mt',
            },
        ];

        const params = {
            collection_name: 'sample_collection',
            fields_data: vectorsData,
        };

        // 插入数据到集合中
        const insert = await milvusClient.insert(params);
        console.log('Inserted data:', insert);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// 调用插入数据的函数
insertData();
