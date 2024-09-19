const sampleQuestions = [
    {
      title: "Design a URL Shortener",
      parts: [
        { 
          question: "How would you design a scalable URL shortening service?", 
          hint: "Consider how to handle billions of URLs and users.", 
          solution: "Use a key-value store with horizontal scaling and caching to handle billions of URLs. Partition the URL data across multiple servers, and use consistent hashing to map URLs to servers." 
        },
        { 
          question: "What data structures would you use?", 
          hint: "Think about key-value pairs, hashmaps, and databases.", 
          solution: "Use a HashMap for mapping short URLs to long URLs. Consider using a NoSQL database like Cassandra or DynamoDB, which supports high throughput and is horizontally scalable." 
        },
        { 
          question: "How would you handle collisions in short URLs?", 
          hint: "Consider hash collisions and how to resolve them.", 
          solution: "Use a retry mechanism to generate a new short URL if a collision occurs. Another method is to append random characters or increase the URL length dynamically if the collision rate increases." 
        },
        { 
          question: "What are potential bottlenecks in the system?", 
          hint: "Think about database load, read/write speeds, and availability.", 
          solution: "Database load could be a bottleneck if URLs are being read/written frequently. You could mitigate this by sharding the database, using read replicas, and implementing caching mechanisms with Redis or Memcached." 
        },
        { 
          question: "How would you ensure fault tolerance and high availability?", 
          hint: "Consider replication, load balancing, and CDNs.", 
          solution: "Use multi-region replication to prevent data loss in case of a data center failure. Implement load balancers to distribute traffic across servers, and use CDNs for faster retrieval of URL metadata." 
        },
        { 
          question: "How would you handle analytics tracking for shortened URLs?", 
          hint: "Consider capturing click data, geographical data, and providing insights to users.", 
          solution: "Log analytics asynchronously to avoid slowing down redirects. Use message queues like Kafka to handle high-throughput click events, and store analytics in a separate data warehouse for analysis." 
        }
      ]
    },
    {
      title: "Design a Ride Sharing Service",
      parts: [
        { 
          question: "How would you design a system to match riders and drivers in real-time?", 
          hint: "Consider real-time communication and geo-location updates.", 
          solution: "Use WebSocket or gRPC for real-time bi-directional communication between drivers, riders, and servers. Geo-location data can be updated frequently using a combination of GPS data from mobile devices and proximity-based matching algorithms." 
        },
        { 
          question: "How would you store and query geo-location data efficiently?", 
          hint: "Consider spatial data and indexing techniques.", 
          solution: "Use a spatial database like PostGIS or MongoDB with geospatial indexing. Use R-trees or Quad-trees for efficient proximity searches and to match riders with nearby drivers quickly." 
        },
        { 
          question: "How would you handle surge pricing and fare calculation?", 
          hint: "Consider dynamic pricing based on demand and supply.", 
          solution: "Implement an algorithm that dynamically adjusts prices based on demand and supply in different areas. Use machine learning models to predict demand and set optimal prices to balance supply and demand." 
        },
        { 
          question: "How would you ensure the system is scalable to handle millions of users?", 
          hint: "Consider microservices, distributed systems, and event-driven architectures.", 
          solution: "Design the system using a microservices architecture where services like matching, payments, and notifications are decoupled. Use an event-driven architecture with message brokers like Kafka to handle spikes in user activity." 
        },
        { 
          question: "How would you handle data consistency in such a distributed system?", 
          hint: "Consider eventual consistency, CAP theorem, and transaction management.", 
          solution: "Use eventual consistency for operations that don't require immediate accuracy, like updating the driver’s location. For critical operations like payments, use distributed transactions with a two-phase commit protocol or Saga patterns." 
        }
      ]
    },
    {
      title: "Design a Content Delivery Network",
      parts: [
        { 
          question: "How would you design a system to cache and distribute static content globally?", 
          hint: "Consider global server distribution, caching strategies, and load balancing.", 
          solution: "Distribute edge servers across multiple geographical locations. Use DNS-based routing to direct users to the nearest server. Cache frequently accessed content at edge servers to reduce latency, and implement cache invalidation policies for dynamic content." 
        },
        { 
          question: "How would you handle cache invalidation and content updates?", 
          hint: "Consider stale content and the need for real-time updates.", 
          solution: "Implement cache invalidation policies like time-to-live (TTL) for static resources. For real-time updates, use WebSockets or Server-Sent Events (SSE) to push changes to edge servers, ensuring that users always get the latest content." 
        },
        { 
          question: "How would you handle load balancing across edge servers?", 
          hint: "Consider distributing traffic efficiently across global servers.", 
          solution: "Use a combination of DNS-based load balancing and Anycast routing. This allows traffic to be routed to the nearest or least-loaded edge server, improving response times and reducing the likelihood of server overloads." 
        },
        { 
          question: "What would be the strategy for handling spikes in traffic?", 
          hint: "Consider traffic scaling, redundancy, and avoiding downtime.", 
          solution: "Use auto-scaling for edge servers based on traffic patterns. Implement request throttling during high-demand periods, and distribute the traffic using load balancers. Maintain redundant servers in each region to handle sudden spikes." 
        },
        { 
          question: "How would you ensure the CDN is fault-tolerant and resilient?", 
          hint: "Consider backup strategies, server redundancy, and disaster recovery.", 
          solution: "Use replication across multiple regions to ensure data availability in case of failure. Implement active-active failover mechanisms so that traffic is routed to other edge servers automatically if one region fails." 
        }
      ]
    },
    {
      title: "Design a Chat Application",
      locked: true,
      parts: [
        { 
          question: "How would you design a real-time messaging system that supports millions of users?", 
          hint: "Consider scalability and low-latency communication.", 
          solution: "Use WebSockets for real-time communication and ensure messages are delivered instantly. Implement horizontal scaling by partitioning users across multiple servers and databases, using consistent hashing to distribute user data." 
        },
        { 
          question: "How would you handle message storage and retrieval?", 
          hint: "Consider storing chat history and allowing quick access to old messages.", 
          solution: "Store messages in a distributed database like Cassandra or HBase, which can scale horizontally. Use sharding for large-scale storage and indexing to allow for quick retrieval of older messages." 
        },
        { 
          question: "How would you ensure message delivery even when users are offline?", 
          hint: "Consider message queues and notification systems.", 
          solution: "Use message queues like Kafka or RabbitMQ to store undelivered messages temporarily. When the user comes online, the server can deliver the pending messages. Push notifications can be used to alert users of new messages." 
        },
        { 
          question: "How would you handle encryption and security of messages?", 
          hint: "Consider end-to-end encryption and secure key management.", 
          solution: "Implement end-to-end encryption (E2EE) using symmetric key encryption for message content, where only the sender and receiver can decrypt messages. Manage encryption keys securely, ensuring they are rotated periodically and stored securely." 
        },
        { 
          question: "How would you handle group chats and message synchronization across devices?", 
          hint: "Consider message fan-out and synchronization logic.", 
          solution: "For group chats, use a fan-out strategy to send messages to all participants. Use a versioning system or message queue to synchronize messages across multiple devices for the same user, ensuring no messages are lost." 
        }
      ]
    },
    {
      title: "Design a Distributed File Storage System",
      locked: true,
      parts: [
        { 
          question: "How would you design a system to store and retrieve large files efficiently?", 
          hint: "Consider distributed storage, sharding, and retrieval speed.", 
          solution: "Split large files into smaller chunks and store them across multiple servers using a distributed file system like HDFS or Ceph. Each chunk can be replicated for redundancy and quick retrieval." 
        },
        { 
          question: "How would you handle file consistency across multiple users?", 
          hint: "Consider synchronization, version control, and eventual consistency.", 
          solution: "Implement file versioning so that changes are tracked and conflicts can be resolved when multiple users update the same file. Use eventual consistency for less critical updates but ensure strong consistency for file writes." 
        },
        { 
          question: "How would you manage file metadata and indexing?", 
          hint: "Consider quick lookups and metadata scaling.", 
          solution: "Use a distributed key-value store like DynamoDB or a metadata service that maps file IDs to their locations in the distributed system. Use indexing for fast lookups and to enable file search functionality." 
        },
        { 
          question: "How would you ensure data durability and fault tolerance?", 
          hint: "Consider replication, backups, and disaster recovery.", 
          solution: "Replicate file chunks across multiple servers in different data centers. Use erasure coding or replication strategies to ensure durability. Regularly back up data to prevent loss in case of hardware failure." 
        },
        { 
          question: "How would you handle access control and security?", 
          hint: "Consider authentication, authorization, and encryption.", 
          solution: "Implement access control using OAuth or role-based access control (RBAC). Encrypt files at rest and in transit using SSL/TLS and secure storage techniques like AES encryption." 
        }
      ]
    }
  ];
  
  export default sampleQuestions;