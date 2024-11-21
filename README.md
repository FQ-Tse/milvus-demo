# milvus-demo
Milvus Learning and Using


## The Core Differences Between Search and Query

| **Comparison**   | **Search**                                    | **Query**                                     |
|------------------|-----------------------------------------------|-----------------------------------------------|
| **Vector-Based** | Yes, based on vector similarity retrieval      | No, purely based on field value filtering     |
| **Sorting**      | Sorts by similarity score                      | No sorting, results follow storage order      |
| **Input**        | Requires query vector                          | Requires only filtering conditions            |
| **Output Control** | Returns top `limit` nearest results sorted by similarity | Returns all records matching conditions (or a limited count) |
| **Main Use Case**| Semantic search, recommendation systems, image/text retrieval | Data filtering, analysis, and conditional lookup |


---

# `metric_type` Parameters and Their Usage

The `metric_type` defines the distance metric for vector similarity search. Below are the supported options and their applications:

| Parameter     | Description                 | Main Purpose                            | Example Use Case              |
| ------------- | --------------------------- | --------------------------------------- | ----------------------------- |
| **L2**        | Euclidean Distance (Squared Distance) | Measures spatial distance between vectors | Image search, location tasks  |
| **IP**        | Inner Product               | Measures vector similarity (larger is more similar) | Recommendation systems, user preference modeling |
| **COSINE**    | Cosine Similarity           | Measures directional consistency (closer to 1 is more similar) | Text semantic matching, NLP tasks |
| **HAMMING**   | Hamming Distance            | Measures bit differences between binary vectors | Genetic sequence analysis, binary feature analysis |
| **JACCARD**   | Jaccard Similarity          | Measures intersection/union ratio of two sets | Recommendation algorithms, label overlap analysis |
| **TANIMOTO**  | Tanimoto Coefficient        | Variant of Jaccard similarity for floating-point features | Chemical molecule similarity, feature clustering |
| **SUPERSTRUCTURE** | Superstructure Comparison (Chemical Domain) | Detects superstructure relationships between molecules | Drug discovery, chemical structure analysis |
| **SUBSTRUCTURE**  | Substructure Comparison (Chemical Domain) | Detects if one molecule is a substructure of another | Chemical substructure analysis, feature search |

---

## Example

```javascript
const createIndex = await milvusClient.createIndex({
    collection_name: 'example_collection',
    field_name: 'vector',
    metric_type: 'COSINE', // Use Cosine Similarity
    index_type: 'HNSW',
    params: { efConstruction: 200 },
});
```

---

### **Markdown - English Version**

# Supported `index_type` Options and Use Cases

`index_type` determines the method used to index vector data. Here are the available index types, their descriptions, and applicable scenarios:

| Index Type     | Description                 | Main Purpose                           | Use Case                       |
| ---------------| --------------------------- | -------------------------------------- | ------------------------------ |
| **FLAT**       | Brute-force Search (Linear) | Scans all vectors without partitioning | Small datasets (<100,000 vectors) |
| **IVF_FLAT**   | Inverted File + Brute Force | Partitions vectors, then searches in selected buckets | Large datasets (>100,000 vectors) with ample memory |
| **IVF_SQ8**    | Inverted File + Scalar Quantization | Partitions and quantizes data to reduce memory usage | Large-scale search with limited memory |
| **IVF_PQ**     | Inverted File + Product Quantization | Partitions and applies product quantization | Very large datasets (>1M vectors) |
| **HNSW**       | Graph-based Nearest Neighbor Search | Optimized query paths using graph structures | High-dimensional data, fast search |
| **RHNSW_FLAT** | Graph + Brute Force         | Graph-based search with brute force in selected buckets | Accurate results, high computation capacity |
| **RHNSW_SQ**   | Graph + Scalar Quantization | Graph search with scalar quantization | Limited computation capacity scenarios |
| **RHNSW_PQ**   | Graph + Product Quantization | Graph search with product quantization | Large datasets with memory constraints |
| **BIN_FLAT**   | Brute Force for Binary Vectors | Compares binary vectors one by one    | Genetic sequence analysis, binary feature retrieval |

---

## Example

```javascript
const createIndex = await milvusClient.createIndex({
    collection_name: 'sample_collection',
    field_name: 'vector',
    index_type: 'HNSW', // Use HNSW Index
    metric_type: 'COSINE',
    params: { efConstruction: 200 }, // HNSW-specific parameter
});
```
---

# `index_type` Comparison: FLAT, IVF_FLAT, and HNSW

Here is a comparison of `FLAT`, `IVF_FLAT`, and `HNSW` index types:

| Feature          | FLAT       | IVF_FLAT     | HNSW         |
| ----------------- | ---------- | ------------ | ------------ |
| Supported Data Scale | Small     | Medium       | Large         |
| Query Speed       | Slow       | Faster       | Very Fast     |
| Memory Usage      | High       | Medium       | Low           |
| Build Time        | No build required | Fast     | Slower        |
| Use Case          | Exact Search | Mid-scale search | Large-scale efficient search |

---

### **Summary**

- **FLAT**: Suitable for small datasets, offers exact search but with slower query speed and high memory usage.
- **IVF_FLAT**: Suitable for medium-scale datasets, provides faster query speed but has higher memory usage and build time.
- **HNSW**: Ideal for large-scale datasets, offers very fast query speed with low memory usage, but the build time is slower.
