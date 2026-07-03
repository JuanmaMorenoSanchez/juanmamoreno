import { Nft } from '@domain/artwork/artwork.entity';
import { ApiResponse } from '@shared/types/api-response.type';

export const FALLBACK_ARTWORKS_API_CALL: ApiResponse<Nft[]> = {
  success: true,
  message: undefined,
  data: [
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '2',
      tokenType: 'ERC1155',
      name: 'Cuando éramos felices',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000002',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/74c4399be3c6b29643951ea6ec310e75',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/74c4399be3c6b29643951ea6ec310e75',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/74c4399be3c6b29643951ea6ec310e75',
        contentType: 'image/jpeg',
        size: 2835867,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/2',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Cuando éramos felices',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/2',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '50',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2021',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-01-23T10:08:39.175Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '4',
      tokenType: 'ERC1155',
      name: 'Stalker',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000004',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/0f9a9b2f3ab9d18e389d04c47a94252f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/0f9a9b2f3ab9d18e389d04c47a94252f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/0f9a9b2f3ab9d18e389d04c47a94252f',
        contentType: 'image/jpeg',
        size: 3493246,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/4',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Stalker',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/4',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '73',
              trait_type: 'Height',
            },
            {
              value: '60',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2021',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-12T23:14:22.343Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '5',
      tokenType: 'ERC1155',
      name: 'Partido de beisbol triturado',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000005',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/cf77b37f8f36966ab201233b607bc71d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/cf77b37f8f36966ab201233b607bc71d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/cf77b37f8f36966ab201233b607bc71d',
        contentType: 'image/jpeg',
        size: 3116948,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/5',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Partido de beisbol triturado',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/5',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '114',
              trait_type: 'Height',
            },
            {
              value: '114',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-12T23:14:22.276Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '6',
      tokenType: 'ERC1155',
      name: 'Reflejo de luz de iPad',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000006',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/3a8c63a82fb491d82baf71c90bd24ac3',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/3a8c63a82fb491d82baf71c90bd24ac3',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/3a8c63a82fb491d82baf71c90bd24ac3',
        contentType: 'image/jpeg',
        size: 3372667,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/6',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Reflejo de luz de iPad',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/6',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '147',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2022',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-12T23:14:22.368Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '7',
      tokenType: 'ERC1155',
      name: 'Mañaneo I',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000007',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6f98289565bafabf6ef8d21cbe7cb4b8',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6f98289565bafabf6ef8d21cbe7cb4b8',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6f98289565bafabf6ef8d21cbe7cb4b8',
        contentType: 'image/jpeg',
        size: 1805055,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/7',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Mañaneo I',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/7',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-12T23:14:22.311Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '8',
      tokenType: 'ERC1155',
      name: 'Mañaneo II',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000008',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/01d8c63a623a81f09bab60c161497426',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/01d8c63a623a81f09bab60c161497426',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/01d8c63a623a81f09bab60c161497426',
        contentType: 'image/jpeg',
        size: 1957211,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/8',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Mañaneo II',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/8',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-12T23:14:22.294Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '9',
      tokenType: 'ERC1155',
      name: 'Monstruo del espacio latente (I)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000009',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9d1f88c8afa19d6ce5d31188e4f527b6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9d1f88c8afa19d6ce5d31188e4f527b6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9d1f88c8afa19d6ce5d31188e4f527b6',
        contentType: 'image/jpeg',
        size: 5083439,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/9',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Monstruo del espacio latente (I)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/9',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '50',
              trait_type: 'Height',
            },
            {
              value: '64,5',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-12T23:14:22.462Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '10',
      tokenType: 'ERC1155',
      name: 'Monstruo del espacio latente (II)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000000a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b70d5a275d4f8418fd1d12272cf359b1',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b70d5a275d4f8418fd1d12272cf359b1',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b70d5a275d4f8418fd1d12272cf359b1',
        contentType: 'image/jpeg',
        size: 2940886,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/10',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Monstruo del espacio latente (II)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/10',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '25',
              trait_type: 'Height',
            },
            {
              value: '25',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-12T23:14:22.303Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '11',
      tokenType: 'ERC1155',
      name: 'Monstruo del espacio latente (III)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000000b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/c71f7674622e776491706d6023d8171d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/c71f7674622e776491706d6023d8171d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/c71f7674622e776491706d6023d8171d',
        contentType: 'image/jpeg',
        size: 2973527,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/11',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Monstruo del espacio latente (III)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/11',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '25',
              trait_type: 'Height',
            },
            {
              value: '25',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.998Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '12',
      tokenType: 'ERC1155',
      name: 'Samanta',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000000c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/1de9ba13d652c9106c31e6fbeb1b4fb8',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/1de9ba13d652c9106c31e6fbeb1b4fb8',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/1de9ba13d652c9106c31e6fbeb1b4fb8',
        contentType: 'image/jpeg',
        size: 3708472,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/12',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Samanta',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/12',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '73',
              trait_type: 'Height',
            },
            {
              value: '60',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2021',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.103Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '13',
      tokenType: 'ERC1155',
      name: 'Siesta en el brasero',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000000d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/eed49f94b51c1410f8c4b526d7afbec1',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/eed49f94b51c1410f8c4b526d7afbec1',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/eed49f94b51c1410f8c4b526d7afbec1',
        contentType: 'image/jpeg',
        size: 3472491,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/13',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Siesta en el brasero',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/13',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '41',
              trait_type: 'Height',
            },
            {
              value: '24',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.066Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '14',
      tokenType: 'ERC1155',
      name: 'Monstruo del espacio latente (IV)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000000e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/f5db77233fecd005f46ce37befeaa30f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/f5db77233fecd005f46ce37befeaa30f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/f5db77233fecd005f46ce37befeaa30f',
        contentType: 'image/jpeg',
        size: 2975426,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/14',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Monstruo del espacio latente (IV)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/14',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '25',
              trait_type: 'Height',
            },
            {
              value: '25',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.928Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '15',
      tokenType: 'ERC1155',
      name: 'Siesta en el camping',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000000f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/4ebfa2e54c2060559790b418d6a7bfd9',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/4ebfa2e54c2060559790b418d6a7bfd9',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/4ebfa2e54c2060559790b418d6a7bfd9',
        contentType: 'image/jpeg',
        size: 2081301,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/15',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Siesta en el camping',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/15',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '48',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.599Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '16',
      tokenType: 'ERC1155',
      name: 'Asunción y descenso',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000010',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9d22cf65119f834f8f9b96ec3f58e881',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9d22cf65119f834f8f9b96ec3f58e881',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9d22cf65119f834f8f9b96ec3f58e881',
        contentType: 'image/jpeg',
        size: 3902321,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/16',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Asunción y descenso',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/16',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '200',
              trait_type: 'Height',
            },
            {
              value: '200',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.526Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '17',
      tokenType: 'ERC1155',
      name: 'Stalker (II)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000011',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/3ff6a5ff0cc1a65c39f5e6048c7f0283',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/3ff6a5ff0cc1a65c39f5e6048c7f0283',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/3ff6a5ff0cc1a65c39f5e6048c7f0283',
        contentType: 'image/jpeg',
        size: 3165181,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/17',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Stalker (II)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/17',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '50',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.864Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '18',
      tokenType: 'ERC1155',
      name: 'Stalker (III)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000012',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/d46914a2bd2d4f3d4541223e90d65cfc',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/d46914a2bd2d4f3d4541223e90d65cfc',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/d46914a2bd2d4f3d4541223e90d65cfc',
        contentType: 'image/jpeg',
        size: 3055458,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/18',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Stalker (III)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/18',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '50',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.455Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '19',
      tokenType: 'ERC1155',
      name: 'Cruzando la meseta',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000013',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/63b4dfcd4809efd7db6850ffec9dd698',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/63b4dfcd4809efd7db6850ffec9dd698',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/63b4dfcd4809efd7db6850ffec9dd698',
        contentType: 'image/jpeg',
        size: 2187093,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/19',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Cruzando la meseta',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/19',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.977Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '20',
      tokenType: 'ERC1155',
      name: '33. El desengaño',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000014',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/ecdc642b99329c5732c6adb22a3e0b7d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/ecdc642b99329c5732c6adb22a3e0b7d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/ecdc642b99329c5732c6adb22a3e0b7d',
        contentType: 'image/jpeg',
        size: 2962163,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/20',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: '33. El desengaño',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/20',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '40',
              trait_type: 'Height',
            },
            {
              value: '40',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.224Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '21',
      tokenType: 'ERC1155',
      name: 'Juego absurdo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000015',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6ffd9241f756a62c2e50eee2bec5729a',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6ffd9241f756a62c2e50eee2bec5729a',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6ffd9241f756a62c2e50eee2bec5729a',
        contentType: 'image/jpeg',
        size: 2347243,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/21',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Juego absurdo',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/21',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '130',
              trait_type: 'Height',
            },
            {
              value: '163',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.466Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '22',
      tokenType: 'ERC1155',
      name: 'Madonna (II)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000016',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/f9f062d7991159eb3803c22e51272068',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/f9f062d7991159eb3803c22e51272068',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/f9f062d7991159eb3803c22e51272068',
        contentType: 'image/jpeg',
        size: 2079100,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/22',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Madonna (II)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/22',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '147',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.999Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '23',
      tokenType: 'ERC1155',
      name: 'Autorretrato con Puri (I)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000017',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/8cb4e46eeb8ef69a2a51a9edb22a2fa7',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/8cb4e46eeb8ef69a2a51a9edb22a2fa7',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/8cb4e46eeb8ef69a2a51a9edb22a2fa7',
        contentType: 'image/jpeg',
        size: 4102699,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/23',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Autorretrato con Puri (I)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/23',
          attributes: [
            {
              value: 'Oil on board',
              trait_type: 'Medium',
            },
            {
              value: '40',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.745Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '24',
      tokenType: 'ERC1155',
      name: 'Autorretrato con Puri (II)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000018',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/3ac10b668689a0f1961ae60b4583c39c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/3ac10b668689a0f1961ae60b4583c39c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/3ac10b668689a0f1961ae60b4583c39c',
        contentType: 'image/jpeg',
        size: 4065966,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/24',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Autorretrato con Puri (II)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/24',
          attributes: [
            {
              value: 'Oil on board',
              trait_type: 'Medium',
            },
            {
              value: '40',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.160Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '25',
      tokenType: 'ERC1155',
      name: 'Autorretrato con Puri (III)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000019',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/7decace872ed74510ccd31ff06f736a0',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/7decace872ed74510ccd31ff06f736a0',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/7decace872ed74510ccd31ff06f736a0',
        contentType: 'image/jpeg',
        size: 4124297,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/25',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Autorretrato con Puri (III)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/25',
          attributes: [
            {
              value: 'Oil on board',
              trait_type: 'Medium',
            },
            {
              value: '40',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.847Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '26',
      tokenType: 'ERC1155',
      name: 'Autorretrato con Puri (IV)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000001a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b4a16ccf6d2ab9795fd0f5a9dc8f7c9b',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b4a16ccf6d2ab9795fd0f5a9dc8f7c9b',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b4a16ccf6d2ab9795fd0f5a9dc8f7c9b',
        contentType: 'image/jpeg',
        size: 3970715,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/26',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Autorretrato con Puri (IV)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/26',
          attributes: [
            {
              value: 'Oil on board',
              trait_type: 'Medium',
            },
            {
              value: '40',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.706Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '27',
      tokenType: 'ERC1155',
      name: 'El perro',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000001b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/cfc3e985bffb2b312fd8588a072dc2f2',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/cfc3e985bffb2b312fd8588a072dc2f2',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/cfc3e985bffb2b312fd8588a072dc2f2',
        contentType: 'image/jpeg',
        size: 2956041,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/27',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El perro',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/27',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '40',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.093Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '28',
      tokenType: 'ERC1155',
      name: 'Botellón en el parque',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000001c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/25bd5a48d5e568032f6ddd4c0fca9f66',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/25bd5a48d5e568032f6ddd4c0fca9f66',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/25bd5a48d5e568032f6ddd4c0fca9f66',
        contentType: 'image/jpeg',
        size: 2872014,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/28',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Botellón en el parque',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/28',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '40',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.539Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '29',
      tokenType: 'ERC1155',
      name: 'The house of the rising sun karaoke version',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000001d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/1183926ba3b8333eea4626fcc479ed81',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/1183926ba3b8333eea4626fcc479ed81',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/1183926ba3b8333eea4626fcc479ed81',
        contentType: 'image/jpeg',
        size: 2705064,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/29',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'The house of the rising sun karaoke version',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/29',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.906Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '30',
      tokenType: 'ERC1155',
      name: 'Dub',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000001e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b21fed290eb20a775503c67ae0ab191b',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b21fed290eb20a775503c67ae0ab191b',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b21fed290eb20a775503c67ae0ab191b',
        contentType: 'image/jpeg',
        size: 3466810,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/30',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Dub',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/30',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '146',
              trait_type: 'Height',
            },
            {
              value: '114',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.969Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '31',
      tokenType: 'ERC1155',
      name: 'Reina',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000001f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/a6952c4b5f019af5d86ae5aba6741cbf',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/a6952c4b5f019af5d86ae5aba6741cbf',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/a6952c4b5f019af5d86ae5aba6741cbf',
        contentType: 'image/jpeg',
        size: 3041604,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/31',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Reina',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/31',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '40',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.584Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '32',
      tokenType: 'ERC1155',
      name: 'Crimen en el olivar',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000020',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/dcb5e75e10b1dc56a3b78af91eaa0789',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/dcb5e75e10b1dc56a3b78af91eaa0789',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/dcb5e75e10b1dc56a3b78af91eaa0789',
        contentType: 'image/jpeg',
        size: 3501844,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/32',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Crimen en el olivar',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/32',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '120',
              trait_type: 'Height',
            },
            {
              value: '100',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.458Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '34',
      tokenType: 'ERC1155',
      name: 'Easter bunny',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000022',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/f78439ccb3b2ee8ec663dc877c906c32',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/f78439ccb3b2ee8ec663dc877c906c32',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/f78439ccb3b2ee8ec663dc877c906c32',
        contentType: 'image/jpeg',
        size: 4838024,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/34',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Easter bunny',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/34',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '195',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.101Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '35',
      tokenType: 'ERC1155',
      name: 'Sexy mal (I)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000023',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/40d3320b71222f15fbc51e6ab9c9794d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/40d3320b71222f15fbc51e6ab9c9794d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/40d3320b71222f15fbc51e6ab9c9794d',
        contentType: 'image/jpeg',
        size: 3806978,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/35',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Sexy mal (I)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/35',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2018',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.861Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '36',
      tokenType: 'ERC1155',
      name: 'Sexy mal (II)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000024',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/d5ead8269ac70f8710f71a11bea284cf',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/d5ead8269ac70f8710f71a11bea284cf',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/d5ead8269ac70f8710f71a11bea284cf',
        contentType: 'image/jpeg',
        size: 2158625,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/36',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Sexy mal (II)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/36',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '21',
              trait_type: 'Height',
            },
            {
              value: '29',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2018',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.829Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '37',
      tokenType: 'ERC1155',
      name: 'Blessed',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000025',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/48c3898443a58dfb528d65db53cbd71e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/48c3898443a58dfb528d65db53cbd71e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/48c3898443a58dfb528d65db53cbd71e',
        contentType: 'image/jpeg',
        size: 2005268,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/37',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Blessed',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/37',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '21',
              trait_type: 'Height',
            },
            {
              value: '29',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.955Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '38',
      tokenType: 'ERC1155',
      name: 'Fiesta en el parking (I)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000026',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/ac728505c99a0810d3e771c0c8197e66',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/ac728505c99a0810d3e771c0c8197e66',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/ac728505c99a0810d3e771c0c8197e66',
        contentType: 'image/jpeg',
        size: 2560284,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/38',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Fiesta en el parking (I)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/38',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '21',
              trait_type: 'Height',
            },
            {
              value: '29',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2018',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.407Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '39',
      tokenType: 'ERC1155',
      name: 'Fiesta en el parking (II)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000027',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/66909476028044f320522ef698297959',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/66909476028044f320522ef698297959',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/66909476028044f320522ef698297959',
        contentType: 'image/jpeg',
        size: 2626045,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/39',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Fiesta en el parking (II)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/39',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '21',
              trait_type: 'Height',
            },
            {
              value: '29',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2018',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.204Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '40',
      tokenType: 'ERC1155',
      name: 'Fiesta en el parking (III)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000028',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/48094a780190c7a20060cf23997bf0f0',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/48094a780190c7a20060cf23997bf0f0',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/48094a780190c7a20060cf23997bf0f0',
        contentType: 'image/jpeg',
        size: 4269400,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/40',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Fiesta en el parking (III)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/40',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2018',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.345Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '41',
      tokenType: 'ERC1155',
      name: 'El ataque de las palomas',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000029',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/5a1316c26b386301ae14a259afb25d58',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/5a1316c26b386301ae14a259afb25d58',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/5a1316c26b386301ae14a259afb25d58',
        contentType: 'image/jpeg',
        size: 3408739,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/41',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El ataque de las palomas',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/41',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '120',
              trait_type: 'Height',
            },
            {
              value: '90',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.389Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '42',
      tokenType: 'ERC1155',
      name: 'Noche caótica',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000002a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b0b997438aec7b94aea074435f1661df',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b0b997438aec7b94aea074435f1661df',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b0b997438aec7b94aea074435f1661df',
        contentType: 'image/jpeg',
        size: 2338569,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/42',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Noche caótica',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/42',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '21',
              trait_type: 'Height',
            },
            {
              value: '29',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2018',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.254Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '43',
      tokenType: 'ERC1155',
      name: 'Fuck you, Juanma Moreno',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000002b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/448fd7add46d8ea60abef7379010aee3',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/448fd7add46d8ea60abef7379010aee3',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/448fd7add46d8ea60abef7379010aee3',
        contentType: 'image/jpeg',
        size: 4025668,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/43',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Fuck you, Juanma Moreno',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/43',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.508Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '44',
      tokenType: 'ERC1155',
      name: 'Aullido',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000002c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/51697c339b213304b839b5504c3fca6f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/51697c339b213304b839b5504c3fca6f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/51697c339b213304b839b5504c3fca6f',
        contentType: 'image/jpeg',
        size: 3919506,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/44',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Aullido',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/44',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.106Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '45',
      tokenType: 'ERC1155',
      name: 'Vodka con fanta',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000002d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/993df381cfda7c2083aff16cc5f3050c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/993df381cfda7c2083aff16cc5f3050c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/993df381cfda7c2083aff16cc5f3050c',
        contentType: 'image/jpeg',
        size: 3923279,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/45',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Vodka con fanta',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/45',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.218Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '46',
      tokenType: 'ERC1155',
      name: '0% battery',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000002e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/d2d57e90613a7f4a8e2d682ea97109ab',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/d2d57e90613a7f4a8e2d682ea97109ab',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/d2d57e90613a7f4a8e2d682ea97109ab',
        contentType: 'image/jpeg',
        size: 2579619,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/46',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: '0% battery',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/46',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '27',
              trait_type: 'Height',
            },
            {
              value: '35',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.556Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '47',
      tokenType: 'ERC1155',
      name: 'La noche (I)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000002f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/962b2a71133bf408e1486f2a9f98127d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/962b2a71133bf408e1486f2a9f98127d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/962b2a71133bf408e1486f2a9f98127d',
        contentType: 'image/jpeg',
        size: 2483076,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/47',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'La noche (I)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/47',
          attributes: [
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '32',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.984Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '48',
      tokenType: 'ERC1155',
      name: 'Festival',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000030',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/45f841445f919ca273266e8a0cedf6c2',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/45f841445f919ca273266e8a0cedf6c2',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/45f841445f919ca273266e8a0cedf6c2',
        contentType: 'image/jpeg',
        size: 2246746,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/48',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Festival',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/48',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.619Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '49',
      tokenType: 'ERC1155',
      name: 'Saltar la verja',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000031',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/78f13d4dd1da4be6ea2f780b2cfaad4c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/78f13d4dd1da4be6ea2f780b2cfaad4c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/78f13d4dd1da4be6ea2f780b2cfaad4c',
        contentType: 'image/jpeg',
        size: 4179903,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/49',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Saltar la verja',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/49',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.354Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '50',
      tokenType: 'ERC1155',
      name: 'La noche (II)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000032',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9df65e9b6f576a33a2e6d8bf2e29ca5a',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9df65e9b6f576a33a2e6d8bf2e29ca5a',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9df65e9b6f576a33a2e6d8bf2e29ca5a',
        contentType: 'image/jpeg',
        size: 2318625,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/50',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'La noche (II)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/50',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '32',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.435Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '51',
      tokenType: 'ERC1155',
      name: 'Monstruo del pantano',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000033',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/98a6f2d48951c176e2a8a1a992497c18',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/98a6f2d48951c176e2a8a1a992497c18',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/98a6f2d48951c176e2a8a1a992497c18',
        contentType: 'image/jpeg',
        size: 3815099,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/51',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Monstruo del pantano',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/51',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.399Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '52',
      tokenType: 'ERC1155',
      name: 'Limbo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000034',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/d4bc0fb71dae55046056b7c127d72331',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/d4bc0fb71dae55046056b7c127d72331',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/d4bc0fb71dae55046056b7c127d72331',
        contentType: 'image/jpeg',
        size: 2249862,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/52',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Limbo',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/52',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '32',
              trait_type: 'Height',
            },
            {
              value: '45',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.895Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '53',
      tokenType: 'ERC1155',
      name: 'Abrazo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000035',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/aaa7806dbf2661081b17cdb44730a4ed',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/aaa7806dbf2661081b17cdb44730a4ed',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/aaa7806dbf2661081b17cdb44730a4ed',
        contentType: 'image/jpeg',
        size: 4005919,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/53',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Abrazo',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/53',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.949Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '54',
      tokenType: 'ERC1155',
      name: 'Piernas',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000036',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/df919eb17420bc535220d38384b7ca88',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/df919eb17420bc535220d38384b7ca88',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/df919eb17420bc535220d38384b7ca88',
        contentType: 'image/jpeg',
        size: 2229146,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/54',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Piernas',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/54',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '16',
              trait_type: 'Height',
            },
            {
              value: '22',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.212Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '56',
      tokenType: 'ERC1155',
      name: 'Botellón',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000038',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/4dec7e754f47fac8a044b93950e0717a',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/4dec7e754f47fac8a044b93950e0717a',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/4dec7e754f47fac8a044b93950e0717a',
        contentType: 'image/jpeg',
        size: 3967022,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/56',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Botellón',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/56',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.409Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '57',
      tokenType: 'ERC1155',
      name: 'Say cheese',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000039',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/1391679376c50a26382c38907169f564',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/1391679376c50a26382c38907169f564',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/1391679376c50a26382c38907169f564',
        contentType: 'image/jpeg',
        size: 3699957,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/57',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Say cheese',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/57',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '32',
              trait_type: 'Height',
            },
            {
              value: '22',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.325Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '58',
      tokenType: 'ERC1155',
      name: 'Asunción',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000003a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9b483626856f8b02a13cc74c4d283b1f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9b483626856f8b02a13cc74c4d283b1f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9b483626856f8b02a13cc74c4d283b1f',
        contentType: 'image/jpeg',
        size: 3709687,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/58',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Asunción',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/58',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '195',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.075Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '59',
      tokenType: 'ERC1155',
      name: 'Supersticiosos',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000003b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/aaa34acc38e7b3b0ff8a40c4cf6cc788',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/aaa34acc38e7b3b0ff8a40c4cf6cc788',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/aaa34acc38e7b3b0ff8a40c4cf6cc788',
        contentType: 'image/jpeg',
        size: 2762433,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/59',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Supersticiosos',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/59',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '16',
              trait_type: 'Height',
            },
            {
              value: '22',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.503Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '60',
      tokenType: 'ERC1155',
      name: 'Piedad',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000003c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b1c5e0c466a3790892521f25ac2e7fc0',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b1c5e0c466a3790892521f25ac2e7fc0',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b1c5e0c466a3790892521f25ac2e7fc0',
        contentType: 'image/jpeg',
        size: 2734957,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/60',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Piedad',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/60',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.482Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '61',
      tokenType: 'ERC1155',
      name: 'Bandeja de entrada',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000003d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/3adc2274530081851673ba91ca3b1f60',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/3adc2274530081851673ba91ca3b1f60',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/3adc2274530081851673ba91ca3b1f60',
        contentType: 'image/jpeg',
        size: 1946346,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/61',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Bandeja de entrada',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/61',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '100',
              trait_type: 'Height',
            },
            {
              value: '81',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.197Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '62',
      tokenType: 'ERC1155',
      name: 'Urinario',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000003e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/d092e78b5b48878b23fe7061bd3ca902',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/d092e78b5b48878b23fe7061bd3ca902',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/d092e78b5b48878b23fe7061bd3ca902',
        contentType: 'image/jpeg',
        size: 3580200,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/62',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Urinario',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/62',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '15',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.875Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '63',
      tokenType: 'ERC1155',
      name: 'Mirando reels',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000003f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/715d899aa154683e202bcf83b41e7a87',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/715d899aa154683e202bcf83b41e7a87',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/715d899aa154683e202bcf83b41e7a87',
        contentType: 'image/jpeg',
        size: 2160242,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/63',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Mirando reels',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/63',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.810Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '64',
      tokenType: 'ERC1155',
      name: 'Cotilleo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000040',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/59cbca75b73c7ad148420251871c7c91',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/59cbca75b73c7ad148420251871c7c91',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/59cbca75b73c7ad148420251871c7c91',
        contentType: 'image/jpeg',
        size: 4067370,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/64',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Cotilleo',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/64',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.439Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '65',
      tokenType: 'ERC1155',
      name: 'Una rosa pa tu pelo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000041',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/a2f8ccf4ab1e0d82118147ec151daa74',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/a2f8ccf4ab1e0d82118147ec151daa74',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/a2f8ccf4ab1e0d82118147ec151daa74',
        contentType: 'image/jpeg',
        size: 3203416,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/65',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Una rosa pa tu pelo',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/65',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '15',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.030Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '66',
      tokenType: 'ERC1155',
      name: 'Cautivo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000042',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/fe07b9c0dc82ba5aecc2de72a563fd7c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/fe07b9c0dc82ba5aecc2de72a563fd7c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/fe07b9c0dc82ba5aecc2de72a563fd7c',
        contentType: 'image/jpeg',
        size: 2224330,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/66',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Cautivo',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/66',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2014',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.938Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '67',
      tokenType: 'ERC1155',
      name: 'Otro puto selfie',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000043',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/f27986c97a8a26ce8645282c07e59227',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/f27986c97a8a26ce8645282c07e59227',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/f27986c97a8a26ce8645282c07e59227',
        contentType: 'image/jpeg',
        size: 2730925,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/67',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Otro puto selfie',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/67',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '146',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2014',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.338Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '68',
      tokenType: 'ERC1155',
      name: 'Hacer la croqueta',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000044',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b05a7d3e439d20cdb65ee9060381c36f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b05a7d3e439d20cdb65ee9060381c36f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b05a7d3e439d20cdb65ee9060381c36f',
        contentType: 'image/jpeg',
        size: 2387531,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/68',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Hacer la croqueta',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/68',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '33',
              trait_type: 'Height',
            },
            {
              value: '41',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2014',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.255Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '69',
      tokenType: 'ERC1155',
      name: 'Aparición mariana',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000045',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/f1ce5b5f514f20295ea00e11ab210b44',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/f1ce5b5f514f20295ea00e11ab210b44',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/f1ce5b5f514f20295ea00e11ab210b44',
        contentType: 'image/jpeg',
        size: 2783638,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/69',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Aparición mariana',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/69',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '116',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.421Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '70',
      tokenType: 'ERC1155',
      name: 'Abrazo de dinosaurio',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000046',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/40b1de7c9102c0873fa280356bc8a88e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/40b1de7c9102c0873fa280356bc8a88e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/40b1de7c9102c0873fa280356bc8a88e',
        contentType: 'image/jpeg',
        size: 4552971,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/70',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Abrazo de dinosaurio',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/70',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '161',
              trait_type: 'Height',
            },
            {
              value: '161',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.942Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '71',
      tokenType: 'ERC1155',
      name: 'Niño-dios aprieta pero no ahoga',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000047',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/1d0f3cc040a3b453f7d70efca44d6c67',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/1d0f3cc040a3b453f7d70efca44d6c67',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/1d0f3cc040a3b453f7d70efca44d6c67',
        contentType: 'image/jpeg',
        size: 3115820,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/71',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Niño-dios aprieta pero no ahoga',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/71',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '146',
              trait_type: 'Height',
            },
            {
              value: '146',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.073Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '72',
      tokenType: 'ERC1155',
      name: 'Dálmatas y vacas',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000048',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/bdd73eb2128942cf0eda0d7a86def57e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/bdd73eb2128942cf0eda0d7a86def57e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/bdd73eb2128942cf0eda0d7a86def57e',
        contentType: 'image/jpeg',
        size: 4291984,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/72',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Dálmatas y vacas',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/72',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '97',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.919Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '73',
      tokenType: 'ERC1155',
      name: 'Carne',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000049',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/0ecbc9facdf00c46342fed63c50fcde0',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/0ecbc9facdf00c46342fed63c50fcde0',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/0ecbc9facdf00c46342fed63c50fcde0',
        contentType: 'image/jpeg',
        size: 4312811,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/73',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Carne',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/73',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '130',
              trait_type: 'Height',
            },
            {
              value: '97',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.031Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '74',
      tokenType: 'ERC1155',
      name: 'El silencio (I)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000004a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/4bd80e60a5d04b54b1f315cb593783f1',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/4bd80e60a5d04b54b1f315cb593783f1',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/4bd80e60a5d04b54b1f315cb593783f1',
        contentType: 'image/jpeg',
        size: 4294184,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/74',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El silencio (I)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/74',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '114',
              trait_type: 'Height',
            },
            {
              value: '146',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.627Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '75',
      tokenType: 'ERC1155',
      name: 'El silencio (II)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000004b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/8d47f4f152ca94891898b483c2698f56',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/8d47f4f152ca94891898b483c2698f56',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/8d47f4f152ca94891898b483c2698f56',
        contentType: 'image/jpeg',
        size: 4391959,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/75',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El silencio (II)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/75',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '114',
              trait_type: 'Height',
            },
            {
              value: '146',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.822Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '76',
      tokenType: 'ERC1155',
      name: 'La belleza',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000004c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/94a1fd4b2dedd04d273c7ca71e9cb36f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/94a1fd4b2dedd04d273c7ca71e9cb36f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/94a1fd4b2dedd04d273c7ca71e9cb36f',
        contentType: 'image/jpeg',
        size: 2228310,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/76',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'La belleza',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/76',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '81',
              trait_type: 'Height',
            },
            {
              value: '100',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.519Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '77',
      tokenType: 'ERC1155',
      name: 'Búsqueda eterna',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000004d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/43321a537e7741701cf4a9d8b1403ac1',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/43321a537e7741701cf4a9d8b1403ac1',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/43321a537e7741701cf4a9d8b1403ac1',
        contentType: 'image/jpeg',
        size: 4913395,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/77',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Búsqueda eterna',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/77',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.904Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '78',
      tokenType: 'ERC1155',
      name: 'Guarros',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000004e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6160683af3b681180123e4b2670479d6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6160683af3b681180123e4b2670479d6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6160683af3b681180123e4b2670479d6',
        contentType: 'image/jpeg',
        size: 4950641,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/78',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Guarros',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/78',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '81',
              trait_type: 'Height',
            },
            {
              value: '64',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.599Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '79',
      tokenType: 'ERC1155',
      name: 'Despedida',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000004f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/c6ce5df3a5033bf1984fdb1f179a9f2f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/c6ce5df3a5033bf1984fdb1f179a9f2f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/c6ce5df3a5033bf1984fdb1f179a9f2f',
        contentType: 'image/jpeg',
        size: 4553131,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/79',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Despedida',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/79',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '60',
              trait_type: 'Height',
            },
            {
              value: '90',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.058Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '80',
      tokenType: 'ERC1155',
      name: 'Los carcamales que seremos',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000050',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/11f70aae5de1722db816c4e1926a8fc3',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/11f70aae5de1722db816c4e1926a8fc3',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/11f70aae5de1722db816c4e1926a8fc3',
        contentType: 'image/jpeg',
        size: 4660922,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/80',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Los carcamales que seremos',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/80',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '60',
              trait_type: 'Height',
            },
            {
              value: '90',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.861Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '81',
      tokenType: 'ERC1155',
      name: 'La estudiante Erasmus',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000051',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/ec98070f405108e9fb495051a2f8a6eb',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/ec98070f405108e9fb495051a2f8a6eb',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/ec98070f405108e9fb495051a2f8a6eb',
        contentType: 'image/jpeg',
        size: 4201933,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/81',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'La estudiante Erasmus',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/81',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '100',
              trait_type: 'Height',
            },
            {
              value: '81',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.953Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '82',
      tokenType: 'ERC1155',
      name: 'Madonna (I)',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000052',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/599490b89e969920beb21008af3e969c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/599490b89e969920beb21008af3e969c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/599490b89e969920beb21008af3e969c',
        contentType: 'image/jpeg',
        size: 3677521,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/82',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Madonna (I)',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/82',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '120',
              trait_type: 'Height',
            },
            {
              value: '100',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.215Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '83',
      tokenType: 'ERC1155',
      name: 'Fin de curso',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000053',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b1ad7a1384e871919e43fd4692dddf2e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b1ad7a1384e871919e43fd4692dddf2e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b1ad7a1384e871919e43fd4692dddf2e',
        contentType: 'image/jpeg',
        size: 8327338,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/83',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Fin de curso',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/83',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '15',
              trait_type: 'Height',
            },
            {
              value: '20',
              trait_type: 'Width',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.018Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '84',
      tokenType: 'ERC1155',
      name: 'Jardín triturado',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000054',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/339b4f06e879fd32ceff026363b8cead',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/339b4f06e879fd32ceff026363b8cead',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/339b4f06e879fd32ceff026363b8cead',
        contentType: 'image/jpeg',
        size: 6880651,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/84',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Jardín triturado',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/84',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '190',
              trait_type: 'Height',
            },
            {
              value: '190',
              trait_type: 'Width',
            },
            {
              value: '2022',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.398Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '85',
      tokenType: 'ERC1155',
      name: 'Jardín triturado',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000055',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/c97949893498603b519fc6f063f60adf',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/c97949893498603b519fc6f063f60adf',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/c97949893498603b519fc6f063f60adf',
        contentType: 'image/jpeg',
        size: 11627848,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/85',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Jardín triturado',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/85',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '190',
              trait_type: 'Height',
            },
            {
              value: '190',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2022',
              trait_type: 'Year',
            },
            {
              value: 'Work in progress',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.158Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '86',
      tokenType: 'ERC1155',
      name: 'El funeral del influencer',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000056',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/921d7041201b3fd7b278049090c94333',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/921d7041201b3fd7b278049090c94333',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/921d7041201b3fd7b278049090c94333',
        contentType: 'image/jpeg',
        size: 9020210,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/86',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El funeral del influencer',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/86',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '146',
              trait_type: 'Height',
            },
            {
              value: '114',
              trait_type: 'Width',
            },
            {
              value: '2017',
              trait_type: 'Year',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: 'Work in progress',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.856Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '87',
      tokenType: 'ERC1155',
      name: 'Maternidad',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000057',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/dbe904431a6aaf4947610d058b22a9a6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/dbe904431a6aaf4947610d058b22a9a6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/dbe904431a6aaf4947610d058b22a9a6',
        contentType: 'image/jpeg',
        size: 4427641,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/87',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Maternidad',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/87',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '81',
              trait_type: 'Height',
            },
            {
              value: '65',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.641Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '88',
      tokenType: 'ERC1155',
      name: 'Musa online',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000058',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6b734aa5e452a441ccb7ccb9e2e393dc',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6b734aa5e452a441ccb7ccb9e2e393dc',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6b734aa5e452a441ccb7ccb9e2e393dc',
        contentType: 'image/jpeg',
        size: 8481863,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/88',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Musa online',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/88',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '15',
              trait_type: 'Height',
            },
            {
              value: '10',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.529Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '89',
      tokenType: 'ERC1155',
      name: 'Cuarentena',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000059',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/e39b4a3f5bd6098873675e7f83bbc71b',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/e39b4a3f5bd6098873675e7f83bbc71b',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/e39b4a3f5bd6098873675e7f83bbc71b',
        contentType: 'image/jpeg',
        size: 7521603,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/89',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Cuarentena',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/89',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '89',
              trait_type: 'Height',
            },
            {
              value: '81',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.202Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '90',
      tokenType: 'ERC1155',
      name: 'Romero de Torres y las señoras aburridas',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000005a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/945ead3a5f1cf5d5af857b3bfda67b33',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/945ead3a5f1cf5d5af857b3bfda67b33',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/945ead3a5f1cf5d5af857b3bfda67b33',
        contentType: 'image/jpeg',
        size: 3871217,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/90',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Romero de Torres y las señoras aburridas',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/90',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '20',
              trait_type: 'Width',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.772Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '91',
      tokenType: 'ERC1155',
      name: 'Polvo en el cementerio',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000005b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9a614aeaaaadc19183ba058ca41137b4',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9a614aeaaaadc19183ba058ca41137b4',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9a614aeaaaadc19183ba058ca41137b4',
        contentType: 'image/jpeg',
        size: 5061578,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/91',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Polvo en el cementerio',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/91',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '40',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.862Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '92',
      tokenType: 'ERC1155',
      name: 'Chat GPT soñando con sentir cosas',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000005c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/96723b18d225fb0901feedbf0afcd62e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/96723b18d225fb0901feedbf0afcd62e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/96723b18d225fb0901feedbf0afcd62e',
        contentType: 'image/jpeg',
        size: 2381935,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/92',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Chat GPT soñando con sentir cosas',
          description: '',
          image:
            'ipfs://bafybeif2qnh5b3xxiev2ke2vmuntv7qcqqbujdkx3qo6epyokomknte6qa/92',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '35',
              trait_type: 'Height',
            },
            {
              value: '27',
              trait_type: 'Width',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2022',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.583Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '93',
      tokenType: 'ERC1155',
      name: 'Alegoría del amor',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000005d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/12697f673f6a49f54e2401be6e1ee6b5',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/12697f673f6a49f54e2401be6e1ee6b5',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/12697f673f6a49f54e2401be6e1ee6b5',
        contentType: 'image/jpeg',
        size: 4501498,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicezajfbkgebx5yyjmzdoq33tsclvfg4fzz3cpoo5cafsa4g5ovv4/93',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Alegoría del amor',
          description: '',
          image:
            'ipfs://bafybeicezajfbkgebx5yyjmzdoq33tsclvfg4fzz3cpoo5cafsa4g5ovv4/93',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '130',
              trait_type: 'Height',
            },
            {
              value: '195',
              trait_type: 'Width',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.989Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '94',
      tokenType: 'ERC1155',
      name: 'Splash',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000005e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/fe5ab8c8569c756e828d75fb9c17e623',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/fe5ab8c8569c756e828d75fb9c17e623',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/fe5ab8c8569c756e828d75fb9c17e623',
        contentType: 'image/jpeg',
        size: 2582558,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiegrp5aspqctnslpgwfy2jmufkjw2m67rpksc7kfnvxxnrj5rffpm/94',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Splash',
          description: '',
          image:
            'ipfs://bafybeiegrp5aspqctnslpgwfy2jmufkjw2m67rpksc7kfnvxxnrj5rffpm/94',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22,5',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.687Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '95',
      tokenType: 'ERC1155',
      name: 'La búsqueda del dios',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000005f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9f0019740220d125df2a92f57bc344d6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9f0019740220d125df2a92f57bc344d6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9f0019740220d125df2a92f57bc344d6',
        contentType: 'image/jpeg',
        size: 4658229,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeia76j3tbe62h3nbnnrzchk6bskqwuckwwqydz7gfctza2t6muxyse/95',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'La búsqueda del dios',
          description: '',
          image:
            'ipfs://bafybeia76j3tbe62h3nbnnrzchk6bskqwuckwwqydz7gfctza2t6muxyse/95',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '195',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.121Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '96',
      tokenType: 'ERC1155',
      name: 'Asunción',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000060',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/40d0358b08a14d14d7771d96e20654fd',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/40d0358b08a14d14d7771d96e20654fd',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/40d0358b08a14d14d7771d96e20654fd',
        contentType: 'image/jpeg',
        size: 5802768,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifmv4abjmrzaqbng3qqj6lhnmmhbb7rhfivwnhdbywe464fsi6ipe/96',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Asunción',
          description: '',
          image:
            'ipfs://bafybeifmv4abjmrzaqbng3qqj6lhnmmhbb7rhfivwnhdbywe464fsi6ipe/96',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '195',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.222Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '97',
      tokenType: 'ERC1155',
      name: 'Usuario',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000061',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/3438148e9008a52cbd1244056fbea5e0',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/3438148e9008a52cbd1244056fbea5e0',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/3438148e9008a52cbd1244056fbea5e0',
        contentType: 'image/jpeg',
        size: 403378,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeibjb3ef5d5vv7uc367dxy33nyjgzjyrtzugn2lk3pflndbc5cfpam/97',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Usuario',
          description: '',
          image:
            'ipfs://bafybeibjb3ef5d5vv7uc367dxy33nyjgzjyrtzugn2lk3pflndbc5cfpam/97',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '20',
              trait_type: 'Width',
            },
            {
              value: '2014',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.276Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '98',
      tokenType: 'ERC1155',
      name: 'Confusión',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000062',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/919f3d93999d63e714c44dae3706b80b',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/919f3d93999d63e714c44dae3706b80b',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/919f3d93999d63e714c44dae3706b80b',
        contentType: 'image/jpeg',
        size: 8292105,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifm5ocdmfu7zwftuf2ggh45wfjeofuancopnhr6st22633hg5orci/98',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Confusión',
          description: '',
          image:
            'ipfs://bafybeifm5ocdmfu7zwftuf2ggh45wfjeofuancopnhr6st22633hg5orci/98',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.159Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '99',
      tokenType: 'ERC1155',
      name: 'Artista aplicando',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000063',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/896db43c2683cd0bac4241e3797c57e6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/896db43c2683cd0bac4241e3797c57e6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/896db43c2683cd0bac4241e3797c57e6',
        contentType: 'image/jpeg',
        size: 2297763,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifxds2k4l3osorrkgdqgayudij7zswlvlr2maj4wm62g6dbxtpqha/99',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Artista aplicando',
          description: '',
          image:
            'ipfs://bafybeifxds2k4l3osorrkgdqgayudij7zswlvlr2maj4wm62g6dbxtpqha/99',
          attributes: [
            {
              value: 'Oil on cardboard',
              trait_type: 'Medium',
            },
            {
              value: '15',
              trait_type: 'Height',
            },
            {
              value: '15',
              trait_type: 'Width',
            },
            {
              value: '2014',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.530Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '100',
      tokenType: 'ERC1155',
      name: 'Ángel I',
      description:
        'En los cuadros de Juanma Moreno Sánchez (Jaén, 1986) hay muchos detalles que invitan a detenerse, al mismo tiempo que inquieta el propio deseo de recrearse en ellos. No son piezas de consumo rápido, de esas que el público descartaría pasando por delante unos segundos. Algo suscita el interés y la atracción por medio de elementos grotescos o perturbadores que irrumpen en la composición y provocan cierta admiración, seguida de una inmediata incomodidad. \n\nUno de los secretos que guardan es el hecho de que tales elementos hayan sido inspirados por una inteligencia artificial generativa. Sí, estamos ante paisajes oníricos y retratos de seres extraños que surgen en parte, de la imaginación del artista y en parte de la experimentación que lleva a cabo con un sistema autónomo. Así, somos capaces de identificar figuras que nos son familiares pero encontramos masas indeterminadas, personas con extremidades de más y plantas u objetos en yuxtaposiciones inusuales.\n\nRecuerda levemente a aquellas escenas de Lucien Freud donde descubríamos personajes con tres brazos o tres piernas, en una singular mezcla de figuración y surrealismo. Del mismo modo, la carne, la fisicidad, cobra importancia en la obra de Moreno Sánchez con un lenguaje plástico que compagina tradición e insolencia, traspasando en ocasiones los límites del pudor.\n\nLa teoría del Valle Inquietante proviene del campo de la robótica, fue elaborada en los años 70 del siglo pasado y tiene sentido en el marco del trabajo de Moreno Sánchez. Originalmente sostiene que cuando las réplicas antropomórficas se acercan en exceso a la apariencia y comportamiento de un ser humano real, causan una respuesta de rechazo entre las personas. Nos cautiva lo humanoide por semejante y nos repele porque, según la teoría, activa el temor subconsciente a que todos nosotros seamos, también, sistemas mecánicos sin alma. Esto entronca con la angustia de incertidumbre sobre la percepción y la tendencia hacia una codificación predictiva. Queremos predecir lo que va a ocurrir en nuestra cotidianidad y en los cuadros que contemplamos, si no lo logramos la sensación es agridulce. Resulta emocionante por un lado y frustrante por otro.\n\nNada malo está sucediendo en las escenas representadas sin embargo observamos un contexto de tensión que es constante, subyace a cada una de las obras del artista que componen el proyecto expositivo. Va a ocurrir un acontecimiento siniestro, la pintura parece señalarlo. Nos muestra el momento previo al desastre, un caos controlado de criaturas indeterminadas, confusas, expectantes y hermosas en su rareza. De hecho, es recurrente la presencia de naranjas, frutas que aluden a la caducidad de todo lo bello, haciendo referencia a lo efímero y corto de la vida. Pero también a que tal vez se masca la tragedia, porque tanto en la pintura como en el cine la aparición de naranjas se suele emplear a modo de metáfora para indicar que se avecina un problema o una traición.  \n\nSchiller explicaba desde la filosofía que cuando sentimos que se aproxima “lo triste, terrible y horrendo nos atrae con una fascinación irresistible”. Aunque la mayoría de las personas no lo reconozcamos. Y que justo los artistas pueden permitirse la libertad de plasmar eso ya que crean una ficción a partir de la que relatar el inconsciente.\n\nAquello que escapa a la normatividad produce miedo, índice y signo del deseo que hace resonar, en lo más íntimo, algo desconocido que nos asusta que nos guste. En un ejercicio de liberación pictórica, predominando los tonos azules y un verde muy especial, diferentes texturas velan rostros serenos, detenidos y contenidos en cada obra. Animales de perfil solemne y naturaleza hibridada con pantallas de móvil, ordenador o tableta, pueblan un universo conceptual en el que lo abyecto cobra valor estético para devolver al espectador su oscuro reflejo.',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000064',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/c8e9c1e4d646845603775f9dd34d0684',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/c8e9c1e4d646845603775f9dd34d0684',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/c8e9c1e4d646845603775f9dd34d0684',
        contentType: 'image/jpeg',
        size: 13319104,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeigogfwyeeqqd6drrgcm7fl4vuvrmn3b4egqxrbv7rkyzzfqjabwii/100',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Ángel I',
          description:
            'En los cuadros de Juanma Moreno Sánchez (Jaén, 1986) hay muchos detalles que invitan a detenerse, al mismo tiempo que inquieta el propio deseo de recrearse en ellos. No son piezas de consumo rápido, de esas que el público descartaría pasando por delante unos segundos. Algo suscita el interés y la atracción por medio de elementos grotescos o perturbadores que irrumpen en la composición y provocan cierta admiración, seguida de una inmediata incomodidad. \n\nUno de los secretos que guardan es el hecho de que tales elementos hayan sido inspirados por una inteligencia artificial generativa. Sí, estamos ante paisajes oníricos y retratos de seres extraños que surgen en parte, de la imaginación del artista y en parte de la experimentación que lleva a cabo con un sistema autónomo. Así, somos capaces de identificar figuras que nos son familiares pero encontramos masas indeterminadas, personas con extremidades de más y plantas u objetos en yuxtaposiciones inusuales.\n\nRecuerda levemente a aquellas escenas de Lucien Freud donde descubríamos personajes con tres brazos o tres piernas, en una singular mezcla de figuración y surrealismo. Del mismo modo, la carne, la fisicidad, cobra importancia en la obra de Moreno Sánchez con un lenguaje plástico que compagina tradición e insolencia, traspasando en ocasiones los límites del pudor.\n\nLa teoría del Valle Inquietante proviene del campo de la robótica, fue elaborada en los años 70 del siglo pasado y tiene sentido en el marco del trabajo de Moreno Sánchez. Originalmente sostiene que cuando las réplicas antropomórficas se acercan en exceso a la apariencia y comportamiento de un ser humano real, causan una respuesta de rechazo entre las personas. Nos cautiva lo humanoide por semejante y nos repele porque, según la teoría, activa el temor subconsciente a que todos nosotros seamos, también, sistemas mecánicos sin alma. Esto entronca con la angustia de incertidumbre sobre la percepción y la tendencia hacia una codificación predictiva. Queremos predecir lo que va a ocurrir en nuestra cotidianidad y en los cuadros que contemplamos, si no lo logramos la sensación es agridulce. Resulta emocionante por un lado y frustrante por otro.\n\nNada malo está sucediendo en las escenas representadas sin embargo observamos un contexto de tensión que es constante, subyace a cada una de las obras del artista que componen el proyecto expositivo. Va a ocurrir un acontecimiento siniestro, la pintura parece señalarlo. Nos muestra el momento previo al desastre, un caos controlado de criaturas indeterminadas, confusas, expectantes y hermosas en su rareza. De hecho, es recurrente la presencia de naranjas, frutas que aluden a la caducidad de todo lo bello, haciendo referencia a lo efímero y corto de la vida. Pero también a que tal vez se masca la tragedia, porque tanto en la pintura como en el cine la aparición de naranjas se suele emplear a modo de metáfora para indicar que se avecina un problema o una traición.  \n\nSchiller explicaba desde la filosofía que cuando sentimos que se aproxima “lo triste, terrible y horrendo nos atrae con una fascinación irresistible”. Aunque la mayoría de las personas no lo reconozcamos. Y que justo los artistas pueden permitirse la libertad de plasmar eso ya que crean una ficción a partir de la que relatar el inconsciente.\n\nAquello que escapa a la normatividad produce miedo, índice y signo del deseo que hace resonar, en lo más íntimo, algo desconocido que nos asusta que nos guste. En un ejercicio de liberación pictórica, predominando los tonos azules y un verde muy especial, diferentes texturas velan rostros serenos, detenidos y contenidos en cada obra. Animales de perfil solemne y naturaleza hibridada con pantallas de móvil, ordenador o tableta, pueblan un universo conceptual en el que lo abyecto cobra valor estético para devolver al espectador su oscuro reflejo.',
          image:
            'ipfs://bafybeigogfwyeeqqd6drrgcm7fl4vuvrmn3b4egqxrbv7rkyzzfqjabwii/100',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: 'ES',
              trait_type: 'Description language',
            },
            {
              value: 'Marisol Salanova',
              trait_type: 'Description Author',
            },
            {
              value: 'El valle inquietante',
              trait_type: 'Project',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.261Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '101',
      tokenType: 'ERC1155',
      name: 'Ángel II',
      description:
        'En los cuadros de Juanma Moreno Sánchez (Jaén, 1986) hay muchos detalles que invitan a detenerse, al mismo tiempo que inquieta el propio deseo de recrearse en ellos. No son piezas de consumo rápido, de esas que el público descartaría pasando por delante unos segundos. Algo suscita el interés y la atracción por medio de elementos grotescos o perturbadores que irrumpen en la composición y provocan cierta admiración, seguida de una inmediata incomodidad. \n\nUno de los secretos que guardan es el hecho de que tales elementos hayan sido inspirados por una inteligencia artificial generativa. Sí, estamos ante paisajes oníricos y retratos de seres extraños que surgen en parte, de la imaginación del artista y en parte de la experimentación que lleva a cabo con un sistema autónomo. Así, somos capaces de identificar figuras que nos son familiares pero encontramos masas indeterminadas, personas con extremidades de más y plantas u objetos en yuxtaposiciones inusuales.\n\nRecuerda levemente a aquellas escenas de Lucien Freud donde descubríamos personajes con tres brazos o tres piernas, en una singular mezcla de figuración y surrealismo. Del mismo modo, la carne, la fisicidad, cobra importancia en la obra de Moreno Sánchez con un lenguaje plástico que compagina tradición e insolencia, traspasando en ocasiones los límites del pudor.\n\nLa teoría del Valle Inquietante proviene del campo de la robótica, fue elaborada en los años 70 del siglo pasado y tiene sentido en el marco del trabajo de Moreno Sánchez. Originalmente sostiene que cuando las réplicas antropomórficas se acercan en exceso a la apariencia y comportamiento de un ser humano real, causan una respuesta de rechazo entre las personas. Nos cautiva lo humanoide por semejante y nos repele porque, según la teoría, activa el temor subconsciente a que todos nosotros seamos, también, sistemas mecánicos sin alma. Esto entronca con la angustia de incertidumbre sobre la percepción y la tendencia hacia una codificación predictiva. Queremos predecir lo que va a ocurrir en nuestra cotidianidad y en los cuadros que contemplamos, si no lo logramos la sensación es agridulce. Resulta emocionante por un lado y frustrante por otro.\n\nNada malo está sucediendo en las escenas representadas sin embargo observamos un contexto de tensión que es constante, subyace a cada una de las obras del artista que componen el proyecto expositivo. Va a ocurrir un acontecimiento siniestro, la pintura parece señalarlo. Nos muestra el momento previo al desastre, un caos controlado de criaturas indeterminadas, confusas, expectantes y hermosas en su rareza. De hecho, es recurrente la presencia de naranjas, frutas que aluden a la caducidad de todo lo bello, haciendo referencia a lo efímero y corto de la vida. Pero también a que tal vez se masca la tragedia, porque tanto en la pintura como en el cine la aparición de naranjas se suele emplear a modo de metáfora para indicar que se avecina un problema o una traición.  \n\nSchiller explicaba desde la filosofía que cuando sentimos que se aproxima “lo triste, terrible y horrendo nos atrae con una fascinación irresistible”. Aunque la mayoría de las personas no lo reconozcamos. Y que justo los artistas pueden permitirse la libertad de plasmar eso ya que crean una ficción a partir de la que relatar el inconsciente.\n\nAquello que escapa a la normatividad produce miedo, índice y signo del deseo que hace resonar, en lo más íntimo, algo desconocido que nos asusta que nos guste. En un ejercicio de liberación pictórica, predominando los tonos azules y un verde muy especial, diferentes texturas velan rostros serenos, detenidos y contenidos en cada obra. Animales de perfil solemne y naturaleza hibridada con pantallas de móvil, ordenador o tableta, pueblan un universo conceptual en el que lo abyecto cobra valor estético para devolver al espectador su oscuro reflejo.',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000065',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/c4327f72d792631bbb58746bae15c285',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/c4327f72d792631bbb58746bae15c285',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/c4327f72d792631bbb58746bae15c285',
        contentType: 'image/jpeg',
        size: 12300191,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihjst2vt2xozrz4ijpeejdoy37ecgk52crexz2wd7fd5zrtt6ymwe/101',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Ángel II',
          description:
            'En los cuadros de Juanma Moreno Sánchez (Jaén, 1986) hay muchos detalles que invitan a detenerse, al mismo tiempo que inquieta el propio deseo de recrearse en ellos. No son piezas de consumo rápido, de esas que el público descartaría pasando por delante unos segundos. Algo suscita el interés y la atracción por medio de elementos grotescos o perturbadores que irrumpen en la composición y provocan cierta admiración, seguida de una inmediata incomodidad. \n\nUno de los secretos que guardan es el hecho de que tales elementos hayan sido inspirados por una inteligencia artificial generativa. Sí, estamos ante paisajes oníricos y retratos de seres extraños que surgen en parte, de la imaginación del artista y en parte de la experimentación que lleva a cabo con un sistema autónomo. Así, somos capaces de identificar figuras que nos son familiares pero encontramos masas indeterminadas, personas con extremidades de más y plantas u objetos en yuxtaposiciones inusuales.\n\nRecuerda levemente a aquellas escenas de Lucien Freud donde descubríamos personajes con tres brazos o tres piernas, en una singular mezcla de figuración y surrealismo. Del mismo modo, la carne, la fisicidad, cobra importancia en la obra de Moreno Sánchez con un lenguaje plástico que compagina tradición e insolencia, traspasando en ocasiones los límites del pudor.\n\nLa teoría del Valle Inquietante proviene del campo de la robótica, fue elaborada en los años 70 del siglo pasado y tiene sentido en el marco del trabajo de Moreno Sánchez. Originalmente sostiene que cuando las réplicas antropomórficas se acercan en exceso a la apariencia y comportamiento de un ser humano real, causan una respuesta de rechazo entre las personas. Nos cautiva lo humanoide por semejante y nos repele porque, según la teoría, activa el temor subconsciente a que todos nosotros seamos, también, sistemas mecánicos sin alma. Esto entronca con la angustia de incertidumbre sobre la percepción y la tendencia hacia una codificación predictiva. Queremos predecir lo que va a ocurrir en nuestra cotidianidad y en los cuadros que contemplamos, si no lo logramos la sensación es agridulce. Resulta emocionante por un lado y frustrante por otro.\n\nNada malo está sucediendo en las escenas representadas sin embargo observamos un contexto de tensión que es constante, subyace a cada una de las obras del artista que componen el proyecto expositivo. Va a ocurrir un acontecimiento siniestro, la pintura parece señalarlo. Nos muestra el momento previo al desastre, un caos controlado de criaturas indeterminadas, confusas, expectantes y hermosas en su rareza. De hecho, es recurrente la presencia de naranjas, frutas que aluden a la caducidad de todo lo bello, haciendo referencia a lo efímero y corto de la vida. Pero también a que tal vez se masca la tragedia, porque tanto en la pintura como en el cine la aparición de naranjas se suele emplear a modo de metáfora para indicar que se avecina un problema o una traición.  \n\nSchiller explicaba desde la filosofía que cuando sentimos que se aproxima “lo triste, terrible y horrendo nos atrae con una fascinación irresistible”. Aunque la mayoría de las personas no lo reconozcamos. Y que justo los artistas pueden permitirse la libertad de plasmar eso ya que crean una ficción a partir de la que relatar el inconsciente.\n\nAquello que escapa a la normatividad produce miedo, índice y signo del deseo que hace resonar, en lo más íntimo, algo desconocido que nos asusta que nos guste. En un ejercicio de liberación pictórica, predominando los tonos azules y un verde muy especial, diferentes texturas velan rostros serenos, detenidos y contenidos en cada obra. Animales de perfil solemne y naturaleza hibridada con pantallas de móvil, ordenador o tableta, pueblan un universo conceptual en el que lo abyecto cobra valor estético para devolver al espectador su oscuro reflejo.',
          image:
            'ipfs://bafybeihjst2vt2xozrz4ijpeejdoy37ecgk52crexz2wd7fd5zrtt6ymwe/101',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: 'ES',
              trait_type: 'Description language',
            },
            {
              value: 'Marisol Salanova',
              trait_type: 'Description Author',
            },
            {
              value: 'El valle inquietante',
              trait_type: 'Project',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.886Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '102',
      tokenType: 'ERC1155',
      name: 'Ángel III',
      description:
        'En los cuadros de Juanma Moreno Sánchez (Jaén, 1986) hay muchos detalles que invitan a detenerse, al mismo tiempo que inquieta el propio deseo de recrearse en ellos. No son piezas de consumo rápido, de esas que el público descartaría pasando por delante unos segundos. Algo suscita el interés y la atracción por medio de elementos grotescos o perturbadores que irrumpen en la composición y provocan cierta admiración, seguida de una inmediata incomodidad. \n\nUno de los secretos que guardan es el hecho de que tales elementos hayan sido inspirados por una inteligencia artificial generativa. Sí, estamos ante paisajes oníricos y retratos de seres extraños que surgen en parte, de la imaginación del artista y en parte de la experimentación que lleva a cabo con un sistema autónomo. Así, somos capaces de identificar figuras que nos son familiares pero encontramos masas indeterminadas, personas con extremidades de más y plantas u objetos en yuxtaposiciones inusuales.\n\nRecuerda levemente a aquellas escenas de Lucien Freud donde descubríamos personajes con tres brazos o tres piernas, en una singular mezcla de figuración y surrealismo. Del mismo modo, la carne, la fisicidad, cobra importancia en la obra de Moreno Sánchez con un lenguaje plástico que compagina tradición e insolencia, traspasando en ocasiones los límites del pudor.\n\nLa teoría del Valle Inquietante proviene del campo de la robótica, fue elaborada en los años 70 del siglo pasado y tiene sentido en el marco del trabajo de Moreno Sánchez. Originalmente sostiene que cuando las réplicas antropomórficas se acercan en exceso a la apariencia y comportamiento de un ser humano real, causan una respuesta de rechazo entre las personas. Nos cautiva lo humanoide por semejante y nos repele porque, según la teoría, activa el temor subconsciente a que todos nosotros seamos, también, sistemas mecánicos sin alma. Esto entronca con la angustia de incertidumbre sobre la percepción y la tendencia hacia una codificación predictiva. Queremos predecir lo que va a ocurrir en nuestra cotidianidad y en los cuadros que contemplamos, si no lo logramos la sensación es agridulce. Resulta emocionante por un lado y frustrante por otro.\n\nNada malo está sucediendo en las escenas representadas sin embargo observamos un contexto de tensión que es constante, subyace a cada una de las obras del artista que componen el proyecto expositivo. Va a ocurrir un acontecimiento siniestro, la pintura parece señalarlo. Nos muestra el momento previo al desastre, un caos controlado de criaturas indeterminadas, confusas, expectantes y hermosas en su rareza. De hecho, es recurrente la presencia de naranjas, frutas que aluden a la caducidad de todo lo bello, haciendo referencia a lo efímero y corto de la vida. Pero también a que tal vez se masca la tragedia, porque tanto en la pintura como en el cine la aparición de naranjas se suele emplear a modo de metáfora para indicar que se avecina un problema o una traición.  \n\nSchiller explicaba desde la filosofía que cuando sentimos que se aproxima “lo triste, terrible y horrendo nos atrae con una fascinación irresistible”. Aunque la mayoría de las personas no lo reconozcamos. Y que justo los artistas pueden permitirse la libertad de plasmar eso ya que crean una ficción a partir de la que relatar el inconsciente.\n\nAquello que escapa a la normatividad produce miedo, índice y signo del deseo que hace resonar, en lo más íntimo, algo desconocido que nos asusta que nos guste. En un ejercicio de liberación pictórica, predominando los tonos azules y un verde muy especial, diferentes texturas velan rostros serenos, detenidos y contenidos en cada obra. Animales de perfil solemne y naturaleza hibridada con pantallas de móvil, ordenador o tableta, pueblan un universo conceptual en el que lo abyecto cobra valor estético para devolver al espectador su oscuro reflejo.',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000066',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/7c3d6c33243c83dd4e867fc2c9e3e242',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/7c3d6c33243c83dd4e867fc2c9e3e242',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/7c3d6c33243c83dd4e867fc2c9e3e242',
        contentType: 'image/jpeg',
        size: 9967349,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeickehr2ijypqzxiim2o2ctk2odkvadxmactm5d4bzipsfy5bbxxca/102',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Ángel III',
          description:
            'En los cuadros de Juanma Moreno Sánchez (Jaén, 1986) hay muchos detalles que invitan a detenerse, al mismo tiempo que inquieta el propio deseo de recrearse en ellos. No son piezas de consumo rápido, de esas que el público descartaría pasando por delante unos segundos. Algo suscita el interés y la atracción por medio de elementos grotescos o perturbadores que irrumpen en la composición y provocan cierta admiración, seguida de una inmediata incomodidad. \n\nUno de los secretos que guardan es el hecho de que tales elementos hayan sido inspirados por una inteligencia artificial generativa. Sí, estamos ante paisajes oníricos y retratos de seres extraños que surgen en parte, de la imaginación del artista y en parte de la experimentación que lleva a cabo con un sistema autónomo. Así, somos capaces de identificar figuras que nos son familiares pero encontramos masas indeterminadas, personas con extremidades de más y plantas u objetos en yuxtaposiciones inusuales.\n\nRecuerda levemente a aquellas escenas de Lucien Freud donde descubríamos personajes con tres brazos o tres piernas, en una singular mezcla de figuración y surrealismo. Del mismo modo, la carne, la fisicidad, cobra importancia en la obra de Moreno Sánchez con un lenguaje plástico que compagina tradición e insolencia, traspasando en ocasiones los límites del pudor.\n\nLa teoría del Valle Inquietante proviene del campo de la robótica, fue elaborada en los años 70 del siglo pasado y tiene sentido en el marco del trabajo de Moreno Sánchez. Originalmente sostiene que cuando las réplicas antropomórficas se acercan en exceso a la apariencia y comportamiento de un ser humano real, causan una respuesta de rechazo entre las personas. Nos cautiva lo humanoide por semejante y nos repele porque, según la teoría, activa el temor subconsciente a que todos nosotros seamos, también, sistemas mecánicos sin alma. Esto entronca con la angustia de incertidumbre sobre la percepción y la tendencia hacia una codificación predictiva. Queremos predecir lo que va a ocurrir en nuestra cotidianidad y en los cuadros que contemplamos, si no lo logramos la sensación es agridulce. Resulta emocionante por un lado y frustrante por otro.\n\nNada malo está sucediendo en las escenas representadas sin embargo observamos un contexto de tensión que es constante, subyace a cada una de las obras del artista que componen el proyecto expositivo. Va a ocurrir un acontecimiento siniestro, la pintura parece señalarlo. Nos muestra el momento previo al desastre, un caos controlado de criaturas indeterminadas, confusas, expectantes y hermosas en su rareza. De hecho, es recurrente la presencia de naranjas, frutas que aluden a la caducidad de todo lo bello, haciendo referencia a lo efímero y corto de la vida. Pero también a que tal vez se masca la tragedia, porque tanto en la pintura como en el cine la aparición de naranjas se suele emplear a modo de metáfora para indicar que se avecina un problema o una traición.  \n\nSchiller explicaba desde la filosofía que cuando sentimos que se aproxima “lo triste, terrible y horrendo nos atrae con una fascinación irresistible”. Aunque la mayoría de las personas no lo reconozcamos. Y que justo los artistas pueden permitirse la libertad de plasmar eso ya que crean una ficción a partir de la que relatar el inconsciente.\n\nAquello que escapa a la normatividad produce miedo, índice y signo del deseo que hace resonar, en lo más íntimo, algo desconocido que nos asusta que nos guste. En un ejercicio de liberación pictórica, predominando los tonos azules y un verde muy especial, diferentes texturas velan rostros serenos, detenidos y contenidos en cada obra. Animales de perfil solemne y naturaleza hibridada con pantallas de móvil, ordenador o tableta, pueblan un universo conceptual en el que lo abyecto cobra valor estético para devolver al espectador su oscuro reflejo.',
          image:
            'ipfs://bafybeickehr2ijypqzxiim2o2ctk2odkvadxmactm5d4bzipsfy5bbxxca/102',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '50',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: 'ES',
              trait_type: 'Description language',
            },
            {
              value: 'Marisol Salanova',
              trait_type: 'Description Author',
            },
            {
              value: 'El valle inquietante',
              trait_type: 'Project',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.034Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '104',
      tokenType: 'ERC1155',
      name: 'Siesta en el camping',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000068',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/25f08e5e422efc21ebfdb7f0277a479c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/25f08e5e422efc21ebfdb7f0277a479c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/25f08e5e422efc21ebfdb7f0277a479c',
        contentType: 'image/jpeg',
        size: 16253279,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifo7nro4vvfmclrsqqxog74uccyjssylwgrvy5kjjsywaqc6ip2we/104',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Siesta en el camping',
          description: '',
          image:
            'ipfs://bafybeifo7nro4vvfmclrsqqxog74uccyjssylwgrvy5kjjsywaqc6ip2we/104',
          attributes: [
            {
              value: '48',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2019',
              trait_type: 'Year',
            },
            {
              value: 'Work in progress',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.664Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '105',
      tokenType: 'ERC1155',
      name: 'Partido de beisbol triturado',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000069',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/55d09ebf438ef13f4d0f44d973273a96',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/55d09ebf438ef13f4d0f44d973273a96',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/55d09ebf438ef13f4d0f44d973273a96',
        contentType: 'image/jpeg',
        size: 5455347,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihljn5uoxid4xr5ogyrmqk6cvpfnf6scd7luov7pvcm6skkpd7cwy/105',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Partido de beisbol triturado',
          description: '',
          image:
            'ipfs://bafybeihljn5uoxid4xr5ogyrmqk6cvpfnf6scd7luov7pvcm6skkpd7cwy/105',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '114',
              trait_type: 'Height',
            },
            {
              value: '114',
              trait_type: 'Width',
            },
            {
              value: '2020',
              trait_type: 'Year',
            },
            {
              value: 'Work in progress',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.767Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '106',
      tokenType: 'ERC1155',
      name: 'Apunte de muchacha',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000006a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/0b669e2dedb7ebd019bdf39a1dd7c667',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/0b669e2dedb7ebd019bdf39a1dd7c667',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/0b669e2dedb7ebd019bdf39a1dd7c667',
        contentType: 'image/jpeg',
        size: 859958,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiflyrcgd5oyldzdk7wwqmqpgh5wwxti442oe7m7smh7lzaf65wugu/106',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Apunte de muchacha',
          description: '',
          image:
            'ipfs://bafybeiflyrcgd5oyldzdk7wwqmqpgh5wwxti442oe7m7smh7lzaf65wugu/106',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '24',
              trait_type: 'Height',
            },
            {
              value: '19',
              trait_type: 'Width',
            },
            {
              value: '2022',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-09T18:23:05.107Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '107',
      tokenType: 'ERC1155',
      name: 'Verano sombrío I',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000006b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6b4fcc9866d3071fd915a1902c5bb9b3',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6b4fcc9866d3071fd915a1902c5bb9b3',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6b4fcc9866d3071fd915a1902c5bb9b3',
        contentType: 'image/jpeg',
        size: 8733750,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihtlxldrxj6vnni7x5zazr4eg77uou377wke37ooar5bwiksioosy/107',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano sombrío I',
          description: '',
          image:
            'ipfs://bafybeihtlxldrxj6vnni7x5zazr4eg77uou377wke37ooar5bwiksioosy/107',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: '2016',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.398Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '108',
      tokenType: 'ERC1155',
      name: 'El putón que fuimos',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000006c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/d3cea17a2a0537ee66027a5bdfd22eab',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/d3cea17a2a0537ee66027a5bdfd22eab',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/d3cea17a2a0537ee66027a5bdfd22eab',
        contentType: 'image/jpeg',
        size: 3317604,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeih3i7mqyjvqej5eoh52dk4zh3ftw24ug5t4gbabrowpu34v6ff4di/108',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El putón que fuimos',
          description: '',
          image:
            'ipfs://bafybeih3i7mqyjvqej5eoh52dk4zh3ftw24ug5t4gbabrowpu34v6ff4di/108',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '90',
              trait_type: 'Height',
            },
            {
              value: '60',
              trait_type: 'Width',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.773Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '109',
      tokenType: 'ERC1155',
      name: 'Estudio de Julio Romero de Torres I',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000006d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/2de86b758f2718f126c89b92aa631865',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/2de86b758f2718f126c89b92aa631865',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/2de86b758f2718f126c89b92aa631865',
        contentType: 'image/jpeg',
        size: 5503820,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidykioebpup3sf7bbgnyb6nvwt7zgse565xybaj3c6zufbqegkc3y/109',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Estudio de Julio Romero de Torres I',
          description: '',
          image:
            'ipfs://bafybeidykioebpup3sf7bbgnyb6nvwt7zgse565xybaj3c6zufbqegkc3y/109',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '40',
              trait_type: 'Width',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.252Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '110',
      tokenType: 'ERC1155',
      name: 'Trenza de Patri',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000006e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/fecdd7b6bf38abe3cc6c7df3fb8d5f29',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/fecdd7b6bf38abe3cc6c7df3fb8d5f29',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/fecdd7b6bf38abe3cc6c7df3fb8d5f29',
        contentType: 'image/jpeg',
        size: 3860637,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifwnrci2mxb4fbw2o7n4enqvokrbak7miwdrovbqorhlqu3yp2rlu/110',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Trenza de Patri',
          description: '',
          image:
            'ipfs://bafybeifwnrci2mxb4fbw2o7n4enqvokrbak7miwdrovbqorhlqu3yp2rlu/110',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '40',
              trait_type: 'Height',
            },
            {
              value: '30',
              trait_type: 'Width',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.326Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '111',
      tokenType: 'ERC1155',
      name: 'Mareo en el hidropedal',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000006f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/8c15d2a925e69a5462dc16d74ea5edb0',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/8c15d2a925e69a5462dc16d74ea5edb0',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/8c15d2a925e69a5462dc16d74ea5edb0',
        contentType: 'image/jpeg',
        size: 1551357,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicl7ys7eyaeowutbigk5qnlfsvhmkzhtgnsy36mmndjwk6hhtt5ly/111',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Mareo en el hidropedal',
          description: '',
          image:
            'ipfs://bafybeicl7ys7eyaeowutbigk5qnlfsvhmkzhtgnsy36mmndjwk6hhtt5ly/111',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '15',
              trait_type: 'Width',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.750Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '112',
      tokenType: 'ERC1155',
      name: 'Verano luminoso I',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000070',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/154b9e39f0b99cbe84069d4cf6e4d602',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/154b9e39f0b99cbe84069d4cf6e4d602',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/154b9e39f0b99cbe84069d4cf6e4d602',
        contentType: 'image/jpeg',
        size: 746667,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidihkfp3c44azbu3uwrblfyrrmpz6cgiirn44ygypaqqelowhcdcy/112',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano luminoso I',
          description: '',
          image:
            'ipfs://bafybeidihkfp3c44azbu3uwrblfyrrmpz6cgiirn44ygypaqqelowhcdcy/112',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '11,5',
              trait_type: 'Height',
            },
            {
              value: '10,5',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.831Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '113',
      tokenType: 'ERC1155',
      name: 'Verano sombrío II',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000071',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/4a482d546b8c27940da4716f08f84317',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/4a482d546b8c27940da4716f08f84317',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/4a482d546b8c27940da4716f08f84317',
        contentType: 'image/jpeg',
        size: 8909796,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeibjbzvnh3vrhpppmavigpkuuzrefosn5elrvmnnx23oxl7z3zsp2u/113',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano sombrío II',
          description: '',
          image:
            'ipfs://bafybeibjbzvnh3vrhpppmavigpkuuzrefosn5elrvmnnx23oxl7z3zsp2u/113',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '16',
              trait_type: 'Width',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.146Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '114',
      tokenType: 'ERC1155',
      name: 'Verano luminoso II',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000072',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6c3ae7bf5ad18f0ad486d5e88e46d5e7',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6c3ae7bf5ad18f0ad486d5e88e46d5e7',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6c3ae7bf5ad18f0ad486d5e88e46d5e7',
        contentType: 'image/jpeg',
        size: 1096591,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicfs3szewngywpl62axirm6mvmiln26afdfo3uclnz7oin4cg672a/114',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano luminoso II',
          description: '',
          image:
            'ipfs://bafybeicfs3szewngywpl62axirm6mvmiln26afdfo3uclnz7oin4cg672a/114',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '15,5',
              trait_type: 'Height',
            },
            {
              value: '10,5',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.595Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '115',
      tokenType: 'ERC1155',
      name: 'Verano luminoso III',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000073',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/f611e82c3c1cdeefecd6d76a0a94427d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/f611e82c3c1cdeefecd6d76a0a94427d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/f611e82c3c1cdeefecd6d76a0a94427d',
        contentType: 'image/jpeg',
        size: 717524,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeibmcycx3jpqrzlwpqbjfyyjl4a52z7oxnshw5wnc2bgzhevdl6uwu/115',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano luminoso III',
          description: '',
          image:
            'ipfs://bafybeibmcycx3jpqrzlwpqbjfyyjl4a52z7oxnshw5wnc2bgzhevdl6uwu/115',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '15,5',
              trait_type: 'Height',
            },
            {
              value: '10,5',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.300Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '117',
      tokenType: 'ERC1155',
      name: 'Verano luminoso IV',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000075',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/98ab2e7f37a3363cc0d5407b0a37f752',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/98ab2e7f37a3363cc0d5407b0a37f752',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/98ab2e7f37a3363cc0d5407b0a37f752',
        contentType: 'image/jpeg',
        size: 629868,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidz2hhn2umukngq6w4al2wy5rxcom63a2o4qi33ndsyjjgsfs6w2m/117',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano luminoso IV',
          description: '',
          image:
            'ipfs://bafybeidz2hhn2umukngq6w4al2wy5rxcom63a2o4qi33ndsyjjgsfs6w2m/117',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '15,5',
              trait_type: 'Height',
            },
            {
              value: '10,5',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.887Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '118',
      tokenType: 'ERC1155',
      name: 'Verano luminoso V',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000076',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/db0723a1e7f23c3202f948176546e86d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/db0723a1e7f23c3202f948176546e86d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/db0723a1e7f23c3202f948176546e86d',
        contentType: 'image/jpeg',
        size: 947284,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeibmobpyjoftk4jxflaep7ibd7s4xzdu3fi5srewa5sk4xj673g5g4/118',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano luminoso V',
          description: '',
          image:
            'ipfs://bafybeibmobpyjoftk4jxflaep7ibd7s4xzdu3fi5srewa5sk4xj673g5g4/118',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '10,5',
              trait_type: 'Height',
            },
            {
              value: '15,5',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-04-21T03:53:19.612Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '119',
      tokenType: 'ERC1155',
      name: 'Verano luminoso VI',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000077',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/a2db0a069c38e4643c2eccd87e7ee9ae',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/a2db0a069c38e4643c2eccd87e7ee9ae',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/a2db0a069c38e4643c2eccd87e7ee9ae',
        contentType: 'image/jpeg',
        size: 719334,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidvgfid472ripzx4avv45jrgg4a6tngcyft2gsgpzhytxzhomacv4/119',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano luminoso VI',
          description: '',
          image:
            'ipfs://bafybeidvgfid472ripzx4avv45jrgg4a6tngcyft2gsgpzhytxzhomacv4/119',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '15,5',
              trait_type: 'Height',
            },
            {
              value: '10,5',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:26.946Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '120',
      tokenType: 'ERC1155',
      name: 'Verano luminoso VII',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000078',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/c2cda1ad8344e93f209186957ad14365',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/c2cda1ad8344e93f209186957ad14365',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/c2cda1ad8344e93f209186957ad14365',
        contentType: 'image/jpeg',
        size: 936694,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidv2yoip4t2twngxvdmgtsukvqipircx4o42juepra2y2fehhaw3y/120',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Verano luminoso VII',
          description: '',
          image:
            'ipfs://bafybeidv2yoip4t2twngxvdmgtsukvqipircx4o42juepra2y2fehhaw3y/120',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '15',
              trait_type: 'Height',
            },
            {
              value: '11,5',
              trait_type: 'Width',
            },
            {
              value: '2012',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.561Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '122',
      tokenType: 'ERC1155',
      name: 'A friend',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000007a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/02d4f6f55c34470786ef46881b05b70b',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/02d4f6f55c34470786ef46881b05b70b',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/02d4f6f55c34470786ef46881b05b70b',
        contentType: 'image/jpeg',
        size: 5938596,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeib44utmsaadt64inlknib6vpupnmlgl3givcnvbfmd47qupicusbu/122',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'A friend',
          description: '',
          image:
            'ipfs://bafybeib44utmsaadt64inlknib6vpupnmlgl3givcnvbfmd47qupicusbu/122',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '30,5',
              trait_type: 'Width',
            },
            {
              value: '30,5',
              trait_type: 'Height',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juan Manuel Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.663Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '123',
      tokenType: 'ERC1155',
      name: 'Carnaval en la periferia',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000007b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/17f7a7a68646a05846f303dddddcb96d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/17f7a7a68646a05846f303dddddcb96d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/17f7a7a68646a05846f303dddddcb96d',
        contentType: 'image/jpeg',
        size: 7332953,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeih4utpgfw36bycezv3mo2lz47slkvldubx2vspexlflbofk2aeufq/123',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Carnaval en la periferia',
          description: '',
          image:
            'ipfs://bafybeih4utpgfw36bycezv3mo2lz47slkvldubx2vspexlflbofk2aeufq/123',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '30,5',
              trait_type: 'Height',
            },
            {
              value: '45,5',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juan Manuel Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T15:12:26.035Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '124',
      tokenType: 'ERC1155',
      name: 'La cigarra',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000007c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/d56e7ec16716c0efed0fccaab7995b4e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/d56e7ec16716c0efed0fccaab7995b4e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/d56e7ec16716c0efed0fccaab7995b4e',
        contentType: 'image/jpeg',
        size: 1457211,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeieyprrizhjf5vc2eohde4jj3nofvduwwj4ley7tdynpcuqqyl3zse/124',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'La cigarra',
          description: '',
          image:
            'ipfs://bafybeieyprrizhjf5vc2eohde4jj3nofvduwwj4ley7tdynpcuqqyl3zse/124',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '10',
              trait_type: 'Height',
            },
            {
              value: '20,5',
              trait_type: 'Width',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.939Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '125',
      tokenType: 'ERC1155',
      name: 'Voyeur',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000007d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9df19c9b36c15f412114db67e4efddb2',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9df19c9b36c15f412114db67e4efddb2',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9df19c9b36c15f412114db67e4efddb2',
        contentType: 'image/jpeg',
        size: 4876765,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeibpdqxlc7hm4b2ttumlt5turhxk37uokegpmny47wvo5y5czonsmi/125',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Voyeur',
          description: '',
          image:
            'ipfs://bafybeibpdqxlc7hm4b2ttumlt5turhxk37uokegpmny47wvo5y5czonsmi/125',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '30,5',
              trait_type: 'Height',
            },
            {
              value: '45,5',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-09T18:23:05.532Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '126',
      tokenType: 'ERC1155',
      name: 'El fin del mundo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000007e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/d5592ef6093da4bc34d0f8d65825ca34',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/d5592ef6093da4bc34d0f8d65825ca34',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/d5592ef6093da4bc34d0f8d65825ca34',
        contentType: 'image/jpeg',
        size: 6620360,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeigco33hmek2wifus76la6ikijgpnz7zdkf4kbsx47hjev25siswlm/126',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El fin del mundo',
          description: '',
          image:
            'ipfs://bafybeigco33hmek2wifus76la6ikijgpnz7zdkf4kbsx47hjev25siswlm/126',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '30,5',
              trait_type: 'Height',
            },
            {
              value: '45,5',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.803Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '127',
      tokenType: 'ERC1155',
      name: 'Multiverso',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000007f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/eeffd462116904de6abac6c6219741c3',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/eeffd462116904de6abac6c6219741c3',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/eeffd462116904de6abac6c6219741c3',
        contentType: 'image/jpeg',
        size: 13640521,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeigysh2uxescce6kpzrh76gpq3g26gqpto67wd3g7lvmqtfdsgjp4m/127',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Multiverso',
          description: '',
          image:
            'ipfs://bafybeigysh2uxescce6kpzrh76gpq3g26gqpto67wd3g7lvmqtfdsgjp4m/127',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '30,5',
              trait_type: 'Height',
            },
            {
              value: '45,5',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-09T18:23:05.983Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '128',
      tokenType: 'ERC1155',
      name: 'Chatting',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000080',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/0bb13475fdf89bc8e5cca54843f2587d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/0bb13475fdf89bc8e5cca54843f2587d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/0bb13475fdf89bc8e5cca54843f2587d',
        contentType: 'image/jpeg',
        size: 1845260,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihic665r42wmyuby4o3qonqbkcyzexf3jjxunoutotyca2qqdw62e/128',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Chatting',
          description: '',
          image:
            'ipfs://bafybeihic665r42wmyuby4o3qonqbkcyzexf3jjxunoutotyca2qqdw62e/128',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '116',
              trait_type: 'Height',
            },
            {
              value: '89',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.383Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '129',
      tokenType: 'ERC1155',
      name: 'El templo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000081',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/647f885ea549c683942c6469bb57fe1a',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/647f885ea549c683942c6469bb57fe1a',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/647f885ea549c683942c6469bb57fe1a',
        contentType: 'image/jpeg',
        size: 6982467,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeigj3w7jhlfjfmitctgkn4yms567ycz3mm7lf2huefnlz4mayqd2lm/129',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El templo',
          description: '',
          image:
            'ipfs://bafybeigj3w7jhlfjfmitctgkn4yms567ycz3mm7lf2huefnlz4mayqd2lm/129',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '23',
              trait_type: 'Height',
            },
            {
              value: '31',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.846Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '130',
      tokenType: 'ERC1155',
      name: 'La hora del té',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000082',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/ff2e73c7b81dc9bcdccff712d32849c9',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/ff2e73c7b81dc9bcdccff712d32849c9',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/ff2e73c7b81dc9bcdccff712d32849c9',
        contentType: 'image/jpeg',
        size: 2795920,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiejd7hla53dr3bttgnlvvtgxpwlfidizodrbvwpzrzw6omfhdqkwu/130',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'La hora del té',
          description: '',
          image:
            'ipfs://bafybeiejd7hla53dr3bttgnlvvtgxpwlfidizodrbvwpzrzw6omfhdqkwu/130',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '100',
              trait_type: 'Height',
            },
            {
              value: '100',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.984Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '131',
      tokenType: 'ERC1155',
      name: 'Iluminando al mundo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000083',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/967d2634081eeec21340cd0c2fcd25f9',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/967d2634081eeec21340cd0c2fcd25f9',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/967d2634081eeec21340cd0c2fcd25f9',
        contentType: 'image/jpeg',
        size: 3271041,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeih3r53gkliqx7dhqixkl5bd27m2i2u3hdf4rskcgwoeba2wulftly/131',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Iluminando al mundo',
          description: '',
          image:
            'ipfs://bafybeih3r53gkliqx7dhqixkl5bd27m2i2u3hdf4rskcgwoeba2wulftly/131',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '100',
              trait_type: 'Height',
            },
            {
              value: '73',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.343Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '132',
      tokenType: 'ERC1155',
      name: 'Hijos de puta',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000084',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6a6b2b46377e469e1997fa4dd851977b',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6a6b2b46377e469e1997fa4dd851977b',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6a6b2b46377e469e1997fa4dd851977b',
        contentType: 'image/jpeg',
        size: 2168365,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiddj2aydjiknmgxp3sdiznnbglmdj5kafzrspuvyuimgwwvax2kpa/132',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Hijos de puta',
          description: '',
          image:
            'ipfs://bafybeiddj2aydjiknmgxp3sdiznnbglmdj5kafzrspuvyuimgwwvax2kpa/132',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '89',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.630Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '133',
      tokenType: 'ERC1155',
      name: 'Pantallas',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000085',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/56bff412c49b4cc8818d8d4176d9ab2d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/56bff412c49b4cc8818d8d4176d9ab2d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/56bff412c49b4cc8818d8d4176d9ab2d',
        contentType: 'image/jpeg',
        size: 22511210,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeih4mfltyzqdtwl2u7ovn42kwmgptj3ws7i6vumsisvjkd362bjohu/133',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Pantallas',
          description: '',
          image:
            'ipfs://bafybeih4mfltyzqdtwl2u7ovn42kwmgptj3ws7i6vumsisvjkd362bjohu/133',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '185',
              trait_type: 'Height',
            },
            {
              value: '240',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:30.053Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '134',
      tokenType: 'ERC1155',
      name: 'Recuerdo feliz',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000086',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6f66e6181222c192694a932fedc89e6d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6f66e6181222c192694a932fedc89e6d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6f66e6181222c192694a932fedc89e6d',
        contentType: 'image/jpeg',
        size: 3325681,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeid7ncxa3fgme3c6n45rf24adlr2xfp5yr2vu6f4m4jvtlnlbjfwpq/134',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Recuerdo feliz',
          description: '',
          image:
            'ipfs://bafybeid7ncxa3fgme3c6n45rf24adlr2xfp5yr2vu6f4m4jvtlnlbjfwpq/134',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '20',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.209Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '135',
      tokenType: 'ERC1155',
      name: 'Reflejo de luz de iPad',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000087',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/c279df89f165e8d65faafc7b1fb3a365',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/c279df89f165e8d65faafc7b1fb3a365',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/c279df89f165e8d65faafc7b1fb3a365',
        contentType: 'image/jpeg',
        size: 15745241,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicrmbz5a4ihzgvuouaimd53pd45xggt2u6jdirbe6tembtocbqzfa/135',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Reflejo de luz de iPad',
          description: '',
          image:
            'ipfs://bafybeicrmbz5a4ihzgvuouaimd53pd45xggt2u6jdirbe6tembtocbqzfa/135',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '147',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: '2022',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.936Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '136',
      tokenType: 'ERC1155',
      name: 'El artista excéntrico ',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000088',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/facb55acc1714b377bd2e7f52b5a286f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/facb55acc1714b377bd2e7f52b5a286f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/facb55acc1714b377bd2e7f52b5a286f',
        contentType: 'image/jpeg',
        size: 3121828,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihzdgfif65osr63q4rebdw5o7wb7gov7gkpczncv4azjwepy2cyf4/136',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El artista excéntrico ',
          description: '',
          image:
            'ipfs://bafybeihzdgfif65osr63q4rebdw5o7wb7gov7gkpczncv4azjwepy2cyf4/136',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '100',
              trait_type: 'Height',
            },
            {
              value: '81',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.521Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '137',
      tokenType: 'ERC1155',
      name: 'Piso de estudiantes I',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000089',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/0c64a898da8f9d2099f8b531ff9b334e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/0c64a898da8f9d2099f8b531ff9b334e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/0c64a898da8f9d2099f8b531ff9b334e',
        contentType: 'image/jpeg',
        size: 2226250,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeig2cf3xdidwn3xhfhwq6vjbk4ywd6bsi3dgaqd2ho5lhxqo7yli3q/137',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Piso de estudiantes I',
          description: '',
          image:
            'ipfs://bafybeig2cf3xdidwn3xhfhwq6vjbk4ywd6bsi3dgaqd2ho5lhxqo7yli3q/137',
          attributes: [
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '11',
              trait_type: 'Height',
            },
            {
              value: '22',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.203Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '138',
      tokenType: 'ERC1155',
      name: 'Piso de estudiantes II',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000008a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9f91be13b1c16e95ad9fdffbea6e0dc0',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9f91be13b1c16e95ad9fdffbea6e0dc0',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9f91be13b1c16e95ad9fdffbea6e0dc0',
        contentType: 'image/jpeg',
        size: 2283428,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihli3fwi2uyvqxd3al7nf3v6pw3he2rm2635w22yl5jqh4djcfbba/138',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Piso de estudiantes II',
          description: '',
          image:
            'ipfs://bafybeihli3fwi2uyvqxd3al7nf3v6pw3he2rm2635w22yl5jqh4djcfbba/138',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: '11',
              trait_type: 'Height',
            },
            {
              value: '22',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-20T09:46:01.356Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '139',
      tokenType: 'ERC1155',
      name: 'Piso de estudiantes III',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000008b',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b71a38b44dce0116395de851b46b01ec',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b71a38b44dce0116395de851b46b01ec',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b71a38b44dce0116395de851b46b01ec',
        contentType: 'image/jpeg',
        size: 4389037,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeib323apfydxncwtax2h5d3juj3xcyp7oriw7ivsjf64dciygiwmoq/139',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Piso de estudiantes III',
          description: '',
          image:
            'ipfs://bafybeib323apfydxncwtax2h5d3juj3xcyp7oriw7ivsjf64dciygiwmoq/139',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '11',
              trait_type: 'Width',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.100Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '140',
      tokenType: 'ERC1155',
      name: 'Paisaje con ángeles',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000008c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/014008d8a32ae5c42fbaad174227eb0c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/014008d8a32ae5c42fbaad174227eb0c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/014008d8a32ae5c42fbaad174227eb0c',
        contentType: 'image/jpeg',
        size: 6747582,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeig4x6qluqxxuadqviejbga53twlqpqnbri7gf7xhq2uowjxgzeh7y/140',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Paisaje con ángeles',
          description: '',
          image:
            'ipfs://bafybeig4x6qluqxxuadqviejbga53twlqpqnbri7gf7xhq2uowjxgzeh7y/140',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '30,5',
              trait_type: 'Height',
            },
            {
              value: '23',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-09T18:23:06.022Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '141',
      tokenType: 'ERC1155',
      name: 'El punk',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000008d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/5227a06d391bd1df7a14abc0f49cdab7',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/5227a06d391bd1df7a14abc0f49cdab7',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/5227a06d391bd1df7a14abc0f49cdab7',
        contentType: 'image/jpeg',
        size: 6580366,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeie72b67lc7qhknzlmqbrrozby2yrvjc4csrocqnr64c7o7q42kefi/141',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'El punk',
          description: '',
          image:
            'ipfs://bafybeie72b67lc7qhknzlmqbrrozby2yrvjc4csrocqnr64c7o7q42kefi/141',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '40,5',
              trait_type: 'Height',
            },
            {
              value: '30,5',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.342Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '143',
      tokenType: 'ERC1155',
      name: 'Bodegón',
      description:
        'En los cuadros de Juanma Moreno Sánchez (Jaén, 1986) hay muchos detalles que invitan a detenerse, al mismo tiempo que inquieta el propio deseo de recrearse en ellos. No son piezas de consumo rápido, de esas que el público descartaría pasando por delante unos segundos. Algo suscita el interés y la atracción por medio de elementos grotescos o perturbadores que irrumpen en la composición y provocan cierta admiración, seguida de una inmediata incomodidad.\n\nUno de los secretos que guardan es el hecho de que tales elementos hayan sido inspirados por una inteligencia artificial generativa. Sí, estamos ante paisajes oníricos y retratos de seres extraños que surgen en parte, de la imaginación del artista y en parte de la experimentación que lleva a cabo con un sistema autónomo. Así, somos capaces de identificar figuras que nos son familiares pero encontramos masas indeterminadas, personas con extremidades de más y plantas u objetos en yuxtaposiciones inusuales.\n\nRecuerda levemente a aquellas escenas de Lucien Freud donde descubríamos personajes con tres brazos o tres piernas, en una singular mezcla de figuración y surrealismo. Del mismo modo, la carne, la fisicidad, cobra importancia en la obra de Moreno Sánchez con un lenguaje plástico que compagina tradición e insolencia, traspasando en ocasiones los límites del pudor.\n\nLa teoría del Valle Inquietante proviene del campo de la robótica, fue elaborada en los años 70 del siglo pasado y tiene sentido en el marco del trabajo de Moreno Sánchez. Originalmente sostiene que cuando las réplicas antropomórficas se acercan en exceso a la apariencia y comportamiento de un ser humano real, causan una respuesta de rechazo entre las personas. Nos cautiva lo humanoide por semejante y nos repele porque, según la teoría, activa el temor subconsciente a que todos nosotros seamos, también, sistemas mecánicos sin alma. Esto entronca con la angustia de incertidumbre sobre la percepción y la tendencia hacia una codificación predictiva. Queremos predecir lo que va a ocurrir en nuestra cotidianidad y en los cuadros que contemplamos, si no lo logramos la sensación es agridulce. Resulta emocionante por un lado y frustrante por otro.\n\nNada malo está sucediendo en las escenas representadas sin embargo observamos un contexto de tensión que es constante, subyace a cada una de las obras del artista que componen el proyecto expositivo. Va a ocurrir un acontecimiento siniestro, la pintura parece señalarlo. Nos muestra el momento previo al desastre, un caos controlado de criaturas indeterminadas, confusas, expectantes y hermosas en su rareza. De hecho, es recurrente la presencia de naranjas, frutas que aluden a la caducidad de todo lo bello, haciendo referencia a lo efímero y corto de la vida. Pero también a que tal vez se masca la tragedia, porque tanto en la pintura como en el cine la aparición de naranjas se suele emplear a modo de metáfora para indicar que se avecina un problema o una traición.\n\nSchiller explicaba desde la filosofía que cuando sentimos que se aproxima “lo triste, terrible y horrendo nos atrae con una fascinación irresistible”. Aunque la mayoría de las personas no lo reconozcamos. Y que justo los artistas pueden permitirse la libertad de plasmar eso ya que crean una ficción a partir de la que relatar el inconsciente.\n\nAquello que escapa a la normatividad produce miedo, índice y signo del deseo que hace resonar, en lo más íntimo, algo desconocido que nos asusta que nos guste. En un ejercicio de liberación pictórica, predominando los tonos azules y un verde muy especial, diferentes texturas velan rostros serenos, detenidos y contenidos en cada obra. Animales de perfil solemne y naturaleza hibridada con pantallas de móvil, ordenador o tableta, pueblan un universo conceptual en el que lo abyecto cobra valor estético para devolver al espectador su oscuro reflejo.',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/000000000000000000000000000000000000000000000000000000000000008f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/dcd3bf14450f376668e0db397eb386da',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/dcd3bf14450f376668e0db397eb386da',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/dcd3bf14450f376668e0db397eb386da',
        contentType: 'image/jpeg',
        size: 17660448,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicl4jn5oyiagvugvakhmrfougmrn3ojvereu2h2orxausskn7j7si/143',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Bodegón',
          description:
            'En los cuadros de Juanma Moreno Sánchez (Jaén, 1986) hay muchos detalles que invitan a detenerse, al mismo tiempo que inquieta el propio deseo de recrearse en ellos. No son piezas de consumo rápido, de esas que el público descartaría pasando por delante unos segundos. Algo suscita el interés y la atracción por medio de elementos grotescos o perturbadores que irrumpen en la composición y provocan cierta admiración, seguida de una inmediata incomodidad.\n\nUno de los secretos que guardan es el hecho de que tales elementos hayan sido inspirados por una inteligencia artificial generativa. Sí, estamos ante paisajes oníricos y retratos de seres extraños que surgen en parte, de la imaginación del artista y en parte de la experimentación que lleva a cabo con un sistema autónomo. Así, somos capaces de identificar figuras que nos son familiares pero encontramos masas indeterminadas, personas con extremidades de más y plantas u objetos en yuxtaposiciones inusuales.\n\nRecuerda levemente a aquellas escenas de Lucien Freud donde descubríamos personajes con tres brazos o tres piernas, en una singular mezcla de figuración y surrealismo. Del mismo modo, la carne, la fisicidad, cobra importancia en la obra de Moreno Sánchez con un lenguaje plástico que compagina tradición e insolencia, traspasando en ocasiones los límites del pudor.\n\nLa teoría del Valle Inquietante proviene del campo de la robótica, fue elaborada en los años 70 del siglo pasado y tiene sentido en el marco del trabajo de Moreno Sánchez. Originalmente sostiene que cuando las réplicas antropomórficas se acercan en exceso a la apariencia y comportamiento de un ser humano real, causan una respuesta de rechazo entre las personas. Nos cautiva lo humanoide por semejante y nos repele porque, según la teoría, activa el temor subconsciente a que todos nosotros seamos, también, sistemas mecánicos sin alma. Esto entronca con la angustia de incertidumbre sobre la percepción y la tendencia hacia una codificación predictiva. Queremos predecir lo que va a ocurrir en nuestra cotidianidad y en los cuadros que contemplamos, si no lo logramos la sensación es agridulce. Resulta emocionante por un lado y frustrante por otro.\n\nNada malo está sucediendo en las escenas representadas sin embargo observamos un contexto de tensión que es constante, subyace a cada una de las obras del artista que componen el proyecto expositivo. Va a ocurrir un acontecimiento siniestro, la pintura parece señalarlo. Nos muestra el momento previo al desastre, un caos controlado de criaturas indeterminadas, confusas, expectantes y hermosas en su rareza. De hecho, es recurrente la presencia de naranjas, frutas que aluden a la caducidad de todo lo bello, haciendo referencia a lo efímero y corto de la vida. Pero también a que tal vez se masca la tragedia, porque tanto en la pintura como en el cine la aparición de naranjas se suele emplear a modo de metáfora para indicar que se avecina un problema o una traición.\n\nSchiller explicaba desde la filosofía que cuando sentimos que se aproxima “lo triste, terrible y horrendo nos atrae con una fascinación irresistible”. Aunque la mayoría de las personas no lo reconozcamos. Y que justo los artistas pueden permitirse la libertad de plasmar eso ya que crean una ficción a partir de la que relatar el inconsciente.\n\nAquello que escapa a la normatividad produce miedo, índice y signo del deseo que hace resonar, en lo más íntimo, algo desconocido que nos asusta que nos guste. En un ejercicio de liberación pictórica, predominando los tonos azules y un verde muy especial, diferentes texturas velan rostros serenos, detenidos y contenidos en cada obra. Animales de perfil solemne y naturaleza hibridada con pantallas de móvil, ordenador o tableta, pueblan un universo conceptual en el que lo abyecto cobra valor estético para devolver al espectador su oscuro reflejo.',
          image:
            'ipfs://bafybeicl4jn5oyiagvugvakhmrfougmrn3ojvereu2h2orxausskn7j7si/143',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '40,5',
              trait_type: 'Height',
            },
            {
              value: '40,5',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: 'ES',
              trait_type: 'Description language',
            },
            {
              value: 'Marisol Salanova',
              trait_type: 'Description Author',
            },
            {
              value: 'El valle inquietante',
              trait_type: 'Project',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.080Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '144',
      tokenType: 'ERC1155',
      name: 'Me duele el flúor I',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000090',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/439003066d5365a783644795cd472735',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/439003066d5365a783644795cd472735',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/439003066d5365a783644795cd472735',
        contentType: 'image/jpeg',
        size: 6916928,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeig5jbx7q4xxljedwq2cr2j7oddixasuc5n2jawj3lztysqfhovlca/144',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Me duele el flúor I',
          description: '',
          image:
            'ipfs://bafybeig5jbx7q4xxljedwq2cr2j7oddixasuc5n2jawj3lztysqfhovlca/144',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '73',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T15:12:26.067Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '145',
      tokenType: 'ERC1155',
      name: 'Me duele el flúor II',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000091',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/66d296397015c4cb98b75bf74947000a',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/66d296397015c4cb98b75bf74947000a',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/66d296397015c4cb98b75bf74947000a',
        contentType: 'image/jpeg',
        size: 6124585,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifplcncah3fyqzj4zdpzskp3vkqb64wldo7hibsoirdrfr6ivf5ru/145',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Me duele el flúor II',
          description: '',
          image:
            'ipfs://bafybeifplcncah3fyqzj4zdpzskp3vkqb64wldo7hibsoirdrfr6ivf5ru/145',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '73',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T15:12:25.865Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '146',
      tokenType: 'ERC1155',
      name: 'Catástrofe en el bosque',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000092',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/774c69e0690f85b0476708137dc6bfc7',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/774c69e0690f85b0476708137dc6bfc7',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/774c69e0690f85b0476708137dc6bfc7',
        contentType: 'image/jpeg',
        size: 5837307,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeian23lydo25st4pru5b2wypb4rc3rmowazx66jgoi3i2as252xhba/146',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Catástrofe en el bosque',
          description: '',
          image:
            'ipfs://bafybeian23lydo25st4pru5b2wypb4rc3rmowazx66jgoi3i2as252xhba/146',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '116',
              trait_type: 'Height',
            },
            {
              value: '89',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.098Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '147',
      tokenType: 'ERC1155',
      name: 'Secuestro en la rave',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000093',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/38b2c428becb90e26a318941f45eba28',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/38b2c428becb90e26a318941f45eba28',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/38b2c428becb90e26a318941f45eba28',
        contentType: 'image/jpeg',
        size: 6538991,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidhmddf4bddht3q2bjviprea2pkzs72d7bvuu6wa6ilrnu4d6ktiu/147',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Secuestro en la rave',
          description: '',
          image:
            'ipfs://bafybeidhmddf4bddht3q2bjviprea2pkzs72d7bvuu6wa6ilrnu4d6ktiu/147',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '130',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:27.980Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '148',
      tokenType: 'ERC1155',
      name: 'Secuestro en la rave',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000094',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/e8612c53b433719b88f5d4354f04fb9d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/e8612c53b433719b88f5d4354f04fb9d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/e8612c53b433719b88f5d4354f04fb9d',
        contentType: 'image/jpeg',
        size: 11240804,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihgmc2saaufx4kbuv3vmc63fmkk2gemzb7bsmeql2nemy54cupsrq/148',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Secuestro en la rave',
          description: '',
          image:
            'ipfs://bafybeihgmc2saaufx4kbuv3vmc63fmkk2gemzb7bsmeql2nemy54cupsrq/148',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '130',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-09T18:23:06.025Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '149',
      tokenType: 'ERC1155',
      name: 'Secuestro en la rave',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/0000000000000000000000000000000000000000000000000000000000000095',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9cbcf39d3fc92f37c7f57d63c8bf7a55',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9cbcf39d3fc92f37c7f57d63c8bf7a55',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9cbcf39d3fc92f37c7f57d63c8bf7a55',
        contentType: 'image/jpeg',
        size: 10903858,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeih73espxrd5vcpsr4atmr6k645hqe646qf2f4fhg67skx6t5hwuqi/149',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic7nt5bwgqika2vgvwmriczvn4icihmypszprkgip4lc6xzjbeeyi/{id}',
        metadata: {
          name: 'Secuestro en la rave',
          description: '',
          image:
            'ipfs://bafybeih73espxrd5vcpsr4atmr6k645hqe646qf2f4fhg67skx6t5hwuqi/149',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '130',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:28.413Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '150',
      tokenType: 'ERC1155',
      name: 'Señoras en el tren',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeig5n52clnmlgabzpjrkma37t2fflnkwc2apvssh6jlsrxch4ti3d4/0000000000000000000000000000000000000000000000000000000000000096',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/68b6f852a485a9f1041a2ed51a93a37a',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/68b6f852a485a9f1041a2ed51a93a37a',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/68b6f852a485a9f1041a2ed51a93a37a',
        contentType: 'image/jpeg',
        size: 4577045,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiah6gnrjeqe3oepkhoe5bsc33osnu3guwgf5gbuofbnswpofmelna/150',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeig5n52clnmlgabzpjrkma37t2fflnkwc2apvssh6jlsrxch4ti3d4/{id}',
        metadata: {
          name: 'Señoras en el tren',
          description: '',
          image:
            'ipfs://bafybeiah6gnrjeqe3oepkhoe5bsc33osnu3guwgf5gbuofbnswpofmelna/150',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '11',
              trait_type: 'Height',
            },
            {
              value: '22',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-09T18:23:06.561Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '151',
      tokenType: 'ERC1155',
      name: 'Catástrofe en el bosque',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/0000000000000000000000000000000000000000000000000000000000000097',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/391bc91c4267fb44345ce4ed25cbf506',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/391bc91c4267fb44345ce4ed25cbf506',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/391bc91c4267fb44345ce4ed25cbf506',
        contentType: 'image/jpeg',
        size: 11278394,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifxcvvfxbx7d5lzjhb3fxee3eokcbkssh3bwu3zuk5camykhd5gce/151',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/{id}',
        metadata: {
          name: 'Catástrofe en el bosque',
          description: '',
          image:
            'ipfs://bafybeifxcvvfxbx7d5lzjhb3fxee3eokcbkssh3bwu3zuk5camykhd5gce/151',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '116',
              trait_type: 'Height',
            },
            {
              value: '89',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Work in progress',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T15:12:33.601Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '152',
      tokenType: 'ERC1155',
      name: 'Secuestro en la rave',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/0000000000000000000000000000000000000000000000000000000000000098',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/86ce20c6c968035c6a6b503aa6100e25',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/86ce20c6c968035c6a6b503aa6100e25',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/86ce20c6c968035c6a6b503aa6100e25',
        contentType: 'image/jpeg',
        size: 5709247,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifynk4vvi2moa5abzmntk2ediskpany5obxxm3gp24yigtyrbj7au/152',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/{id}',
        metadata: {
          name: 'Secuestro en la rave',
          description: '',
          image:
            'ipfs://bafybeifynk4vvi2moa5abzmntk2ediskpany5obxxm3gp24yigtyrbj7au/152',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '130',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
            {
              value: '2',
              trait_type: 'Version',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T15:12:29.817Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '153',
      tokenType: 'ERC1155',
      name: 'Chapoteo en una noche de verano',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/0000000000000000000000000000000000000000000000000000000000000099',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/cf70ed0bd01aef01073edff3e435e76d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/cf70ed0bd01aef01073edff3e435e76d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/cf70ed0bd01aef01073edff3e435e76d',
        contentType: 'image/jpeg',
        size: 7534781,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeib5wpdqsbbyqehmiydodjlpyb7u6bygtoirkernhixyderstiu5wi/153',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/{id}',
        metadata: {
          name: 'Chapoteo en una noche de verano',
          description: '',
          image:
            'ipfs://bafybeib5wpdqsbbyqehmiydodjlpyb7u6bygtoirkernhixyderstiu5wi/153',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '97',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2018',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T21:17:12.967Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '154',
      tokenType: 'ERC1155',
      name: 'Chapoteo en una noche de verano',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/000000000000000000000000000000000000000000000000000000000000009a',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/32a669f7e9506825ee024ee113769dd0',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/32a669f7e9506825ee024ee113769dd0',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/32a669f7e9506825ee024ee113769dd0',
        contentType: 'image/jpeg',
        size: 9789768,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifdx64m3lqrlrrvqj2fytfsn435fsxa42x4ka4h7vmwvdcr7rez3m/154',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/{id}',
        metadata: {
          name: 'Chapoteo en una noche de verano',
          description: '',
          image:
            'ipfs://bafybeifdx64m3lqrlrrvqj2fytfsn435fsxa42x4ka4h7vmwvdcr7rez3m/154',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '97',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2018',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T21:17:15.534Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '156',
      tokenType: 'ERC1155',
      name: 'Entierro al atardecer',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/000000000000000000000000000000000000000000000000000000000000009c',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/93dfe790c6d34ad0b7f2bdf7dc7a610c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/93dfe790c6d34ad0b7f2bdf7dc7a610c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/93dfe790c6d34ad0b7f2bdf7dc7a610c',
        contentType: 'image/jpeg',
        size: 6355263,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeig7sukx3exsvia6dadzdgxa45v4w54ub5j2pndgq7cwfsbon5wvoq/156',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/{id}',
        metadata: {
          name: 'Entierro al atardecer',
          description: '',
          image:
            'ipfs://bafybeig7sukx3exsvia6dadzdgxa45v4w54ub5j2pndgq7cwfsbon5wvoq/156',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '146',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: '2014',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T21:17:19.176Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '157',
      tokenType: 'ERC1155',
      name: 'Entierro al atardecer',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/000000000000000000000000000000000000000000000000000000000000009d',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/896039078805687a51e61f5296ed7dee',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/896039078805687a51e61f5296ed7dee',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/896039078805687a51e61f5296ed7dee',
        contentType: 'image/jpeg',
        size: 12989548,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiboslxztnluwnkgzfob5t5tn3z7stsiw3lhvx72337wbjptmwtyp4/157',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/{id}',
        metadata: {
          name: 'Entierro al atardecer',
          description: '',
          image:
            'ipfs://bafybeiboslxztnluwnkgzfob5t5tn3z7stsiw3lhvx72337wbjptmwtyp4/157',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '146',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: '2014',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T21:17:15.702Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '158',
      tokenType: 'ERC1155',
      name: 'Secuestro en la rave',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/000000000000000000000000000000000000000000000000000000000000009e',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/1f305b8a62a72a52e8a4b1166c8fcfcd',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/1f305b8a62a72a52e8a4b1166c8fcfcd',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/1f305b8a62a72a52e8a4b1166c8fcfcd',
        contentType: 'image/jpeg',
        size: 15887141,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifiamie5bhnma5j5jcxdrbl4b3f6u3jlwvky27tmcjyxbm56yedna/158',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/{id}',
        metadata: {
          name: 'Secuestro en la rave',
          description: '',
          image:
            'ipfs://bafybeifiamie5bhnma5j5jcxdrbl4b3f6u3jlwvky27tmcjyxbm56yedna/158',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '130',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2024',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T15:12:31.742Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '159',
      tokenType: 'ERC1155',
      name: 'Paisaje nostálgico',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/000000000000000000000000000000000000000000000000000000000000009f',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/e6f38504eb3efaaf8fcb98c5fe9232b1',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/e6f38504eb3efaaf8fcb98c5fe9232b1',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/e6f38504eb3efaaf8fcb98c5fe9232b1',
        contentType: 'image/jpeg',
        size: 1548987,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicgi73f5jxktnscuvhnvvtoguiedrai5aipl5hotxqxnfvndmy7fy/159',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiavkcwstp32bzjgqlpkxd2arqkcoqs6d36soskvuu4jibl52flwu4/{id}',
        metadata: {
          name: 'Paisaje nostálgico',
          description: '',
          image:
            'ipfs://bafybeicgi73f5jxktnscuvhnvvtoguiedrai5aipl5hotxqxnfvndmy7fy/159',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '40',
              trait_type: 'Height',
            },
            {
              value: '40',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-02-19T21:17:14.082Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '160',
      tokenType: 'ERC1155',
      name: 'Festival de influencers',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeia6yf3nmfrtlum7yjqj4o54bfcd75r447lfjwlmprmqoxyqmpxjrm/00000000000000000000000000000000000000000000000000000000000000a0',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/8a606b46593ef9243fc4d380f2dba00d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/8a606b46593ef9243fc4d380f2dba00d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/8a606b46593ef9243fc4d380f2dba00d',
        contentType: 'image/jpeg',
        size: 7186365,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiezotrgoshszrthvgi5hkk4q3bqhm6rizpo7i363aruueewmmhuji/160',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeia6yf3nmfrtlum7yjqj4o54bfcd75r447lfjwlmprmqoxyqmpxjrm/{id}',
        metadata: {
          name: 'Festival de influencers',
          description: '',
          image:
            'ipfs://bafybeiezotrgoshszrthvgi5hkk4q3bqhm6rizpo7i363aruueewmmhuji/160',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '120',
              trait_type: 'Width',
            },
            {
              value: '100',
              trait_type: 'Height',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.709Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '161',
      tokenType: 'ERC1155',
      name: 'Domingo por la tarde en el parque',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeia6yf3nmfrtlum7yjqj4o54bfcd75r447lfjwlmprmqoxyqmpxjrm/00000000000000000000000000000000000000000000000000000000000000a1',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/2bd72b56fee50011824c81fee6bf48bd',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/2bd72b56fee50011824c81fee6bf48bd',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/2bd72b56fee50011824c81fee6bf48bd',
        contentType: 'image/jpeg',
        size: 4419145,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeibck55kkbyb3vwcv62g3s6xejlq3voodrksvgynscspfdhhppqm3m/161',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeia6yf3nmfrtlum7yjqj4o54bfcd75r447lfjwlmprmqoxyqmpxjrm/{id}',
        metadata: {
          name: 'Domingo por la tarde en el parque',
          description: '',
          image:
            'ipfs://bafybeibck55kkbyb3vwcv62g3s6xejlq3voodrksvgynscspfdhhppqm3m/161',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '30,5',
              trait_type: 'Height',
            },
            {
              value: '45,5',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.927Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '162',
      tokenType: 'ERC1155',
      name: 'Dont buy conceptual crap',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeia6yf3nmfrtlum7yjqj4o54bfcd75r447lfjwlmprmqoxyqmpxjrm/00000000000000000000000000000000000000000000000000000000000000a2',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b3a01f566c4dcf022a074beaf9bf917e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b3a01f566c4dcf022a074beaf9bf917e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b3a01f566c4dcf022a074beaf9bf917e',
        contentType: 'image/jpeg',
        size: 5546249,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicxx6hyemiplqptfqb7w3ixbfajj5b6ce67h3sychxjs2rformmqa/162',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeia6yf3nmfrtlum7yjqj4o54bfcd75r447lfjwlmprmqoxyqmpxjrm/{id}',
        metadata: {
          name: 'Dont buy conceptual crap',
          description: '',
          image:
            'ipfs://bafybeicxx6hyemiplqptfqb7w3ixbfajj5b6ce67h3sychxjs2rformmqa/162',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '30,5',
              trait_type: 'Height',
            },
            {
              value: '32',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:29.580Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '163',
      tokenType: 'ERC1155',
      name: 'Fotógrafa',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeia6yf3nmfrtlum7yjqj4o54bfcd75r447lfjwlmprmqoxyqmpxjrm/00000000000000000000000000000000000000000000000000000000000000a3',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/c905506b2e5af7206daea5eccfe9afc5',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/c905506b2e5af7206daea5eccfe9afc5',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/c905506b2e5af7206daea5eccfe9afc5',
        contentType: 'image/jpeg',
        size: 10838045,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeib7axbrhmo6qe5v565au4z7kvgdj5vejbyicjhmszetpszid2xv54/163',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeia6yf3nmfrtlum7yjqj4o54bfcd75r447lfjwlmprmqoxyqmpxjrm/{id}',
        metadata: {
          name: 'Fotógrafa',
          description: '',
          image:
            'ipfs://bafybeib7axbrhmo6qe5v565au4z7kvgdj5vejbyicjhmszetpszid2xv54/163',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '45,5',
              trait_type: 'Height',
            },
            {
              value: '30,5',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-03-20T12:36:30.614Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '164',
      tokenType: 'ERC1155',
      name: 'Stolen pic I',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000a4',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6ae44a42e4942cce7db8b3abdb506e6d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6ae44a42e4942cce7db8b3abdb506e6d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6ae44a42e4942cce7db8b3abdb506e6d',
        contentType: 'image/jpeg',
        size: 2871875,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeigcxwdna2wwwwb56mdtowjzdfshdmebqq7zrc5j2yfap53tj6tuie/164',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Stolen pic I',
          description: '',
          image:
            'ipfs://bafybeigcxwdna2wwwwb56mdtowjzdfshdmebqq7zrc5j2yfap53tj6tuie/164',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '22',
              trait_type: 'Height',
            },
            {
              value: '22',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:24.680Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '165',
      tokenType: 'ERC1155',
      name: 'Stolen pic II',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000a5',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/95f63d5565733e468472be3cf661b228',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/95f63d5565733e468472be3cf661b228',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/95f63d5565733e468472be3cf661b228',
        contentType: 'image/jpeg',
        size: 3457848,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeib4oiqrxstiztiznrnyc7jtvtlq3xvumijq53na6zm5lf4tt4c2ki/165',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Stolen pic II',
          description: '',
          image:
            'ipfs://bafybeib4oiqrxstiztiznrnyc7jtvtlq3xvumijq53na6zm5lf4tt4c2ki/165',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '20',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-23T04:13:17.455Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '166',
      tokenType: 'ERC1155',
      name: 'Stolen pic III',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000a6',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/08f194aca3cef28e9a415bc68844b5ff',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/08f194aca3cef28e9a415bc68844b5ff',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/08f194aca3cef28e9a415bc68844b5ff',
        contentType: 'image/jpeg',
        size: 3034356,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeigau5c77kikhxlzihf37bucpapuqdbsuneyljd5j6zwtzyrhns2fu/166',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Stolen pic III',
          description: '',
          image:
            'ipfs://bafybeigau5c77kikhxlzihf37bucpapuqdbsuneyljd5j6zwtzyrhns2fu/166',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '20',
              trait_type: 'Height',
            },
            {
              value: '20',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:28.047Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '167',
      tokenType: 'ERC1155',
      name: 'Transeúntes',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000a7',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/2af4f2c08207e8694b40f5f032174a08',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/2af4f2c08207e8694b40f5f032174a08',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/2af4f2c08207e8694b40f5f032174a08',
        contentType: 'image/jpeg',
        size: 6255090,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiby5vjlruzpweoa7twckssbrbl46ifw225hqfghmd6nnphbb25cka/167',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Transeúntes',
          description: '',
          image:
            'ipfs://bafybeiby5vjlruzpweoa7twckssbrbl46ifw225hqfghmd6nnphbb25cka/167',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '100',
              trait_type: 'Height',
            },
            {
              value: '150',
              trait_type: 'Width',
            },
            {
              value: '2008',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:27.816Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '168',
      tokenType: 'ERC1155',
      name: 'After a bigger spash',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000a8',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6da11c3f082f9a2ca73278d9efaa0ac7',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6da11c3f082f9a2ca73278d9efaa0ac7',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6da11c3f082f9a2ca73278d9efaa0ac7',
        contentType: 'image/jpeg',
        size: 841502,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicukfovh6nbsfp7q5plvtiwffavqdawmftkkw5i54iaj5nwt4etta/168',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'After a bigger spash',
          description: '',
          image:
            'ipfs://bafybeicukfovh6nbsfp7q5plvtiwffavqdawmftkkw5i54iaj5nwt4etta/168',
          attributes: [
            {
              value: 'Drawing on paper',
              trait_type: 'Medium',
            },
            {
              value: '105',
              trait_type: 'Height',
            },
            {
              value: '76',
              trait_type: 'Width',
            },
            {
              value: '2008',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-16T22:30:54.072Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '169',
      tokenType: 'ERC1155',
      name: 'Un buen día',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000a9',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/7f055059a88ae3714bc72a836daa8736',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/7f055059a88ae3714bc72a836daa8736',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/7f055059a88ae3714bc72a836daa8736',
        contentType: 'image/jpeg',
        size: 4881087,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeibxrtf37dqjnnrqbqeolgdw67y35dnj5slst3vcmea2huhkv2p4ma/169',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Un buen día',
          description: '',
          image:
            'ipfs://bafybeibxrtf37dqjnnrqbqeolgdw67y35dnj5slst3vcmea2huhkv2p4ma/169',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '25',
              trait_type: 'Height',
            },
            {
              value: '25',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:29.296Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '170',
      tokenType: 'ERC1155',
      name: 'Veinteañeros en la Feria de San Mateo',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000aa',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/e01bd64f58e696214d12bd754773dc37',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/e01bd64f58e696214d12bd754773dc37',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/e01bd64f58e696214d12bd754773dc37',
        contentType: 'image/jpeg',
        size: 6517181,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifwzkpmep3lcoltf7ugdenbixabfvzx3bv4yyvy5sjlmf3rzejp3y/170',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Veinteañeros en la Feria de San Mateo',
          description: '',
          image:
            'ipfs://bafybeifwzkpmep3lcoltf7ugdenbixabfvzx3bv4yyvy5sjlmf3rzejp3y/170',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '162',
              trait_type: 'Height',
            },
            {
              value: '114',
              trait_type: 'Width',
            },
            {
              value: '2010',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:28.795Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '171',
      tokenType: 'ERC1155',
      name: 'Abuelo',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000ab',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b7d577eda8e3fa7add2d708592682aed',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b7d577eda8e3fa7add2d708592682aed',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b7d577eda8e3fa7add2d708592682aed',
        contentType: 'image/jpeg',
        size: 7253646,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeierf5gm6tlfwe7linxyghw56xs5l5n4qu3lln2k5dvz5n4o4jkcra/171',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Abuelo',
          description: '',
          image:
            'ipfs://bafybeierf5gm6tlfwe7linxyghw56xs5l5n4qu3lln2k5dvz5n4o4jkcra/171',
          attributes: [
            {
              value: 'Oil on aluminium',
              trait_type: 'Medium',
            },
            {
              value: '54',
              trait_type: 'Height',
            },
            {
              value: '41',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:31.302Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '172',
      tokenType: 'ERC1155',
      name: 'Crucifijo',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000ac',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/95983e30b735782b86100d4890f94b4d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/95983e30b735782b86100d4890f94b4d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/95983e30b735782b86100d4890f94b4d',
        contentType: 'image/jpeg',
        size: 7668532,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidgxfga7zd6uewxbruanuet54q5apyvfugmqlf6vnvcpcl47nch3m/172',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Crucifijo',
          description: '',
          image:
            'ipfs://bafybeidgxfga7zd6uewxbruanuet54q5apyvfugmqlf6vnvcpcl47nch3m/172',
          attributes: [
            {
              value: 'Oil on wood',
              trait_type: 'Medium',
            },
            {
              value: '30',
              trait_type: 'Height',
            },
            {
              value: '40',
              trait_type: 'Width',
            },
            {
              value: '2011',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:28.200Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '173',
      tokenType: 'ERC1155',
      name: 'Comedor de gambas',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000ad',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/141cc18c38bac6e7d51de7a2c6df3c1c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/141cc18c38bac6e7d51de7a2c6df3c1c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/141cc18c38bac6e7d51de7a2c6df3c1c',
        contentType: 'image/jpeg',
        size: 7422282,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihyppx2a4xx24ua3ybra37wjkibuis6pq2ynmnwroikjiqtjbmksi/173',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Comedor de gambas',
          description: '',
          image:
            'ipfs://bafybeihyppx2a4xx24ua3ybra37wjkibuis6pq2ynmnwroikjiqtjbmksi/173',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '61',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: '2009',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:28.553Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '174',
      tokenType: 'ERC1155',
      name: 'Botellón en el pueblo',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/00000000000000000000000000000000000000000000000000000000000000ae',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/766b487c802c16d90a692c741b342174',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/766b487c802c16d90a692c741b342174',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/766b487c802c16d90a692c741b342174',
        contentType: 'image/jpeg',
        size: 10255518,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiey42aloc2u4gqhobtlbe2kshj6nuydt6nafmquit2oir4jl3iifu/174',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicpslhucerwnosj5w2lkkrhmtyg4ew7acobulpx3bwo66r4tefsxm/{id}',
        metadata: {
          name: 'Botellón en el pueblo',
          description: '',
          image:
            'ipfs://bafybeiey42aloc2u4gqhobtlbe2kshj6nuydt6nafmquit2oir4jl3iifu/174',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '73',
              trait_type: 'Height',
            },
            {
              value: '50',
              trait_type: 'Width',
            },
            {
              value: '2013',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-05-20T18:04:26.485Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '176',
      tokenType: 'ERC1155',
      name: 'Primer día con Iris en casa',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiccahx3vfwlvgvpjyoh4rik5ms76yrjkkd2nwcsvpzysquogyw5mm/00000000000000000000000000000000000000000000000000000000000000b0',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/2bfea1d4584e654d2b94ccb5d3c66b0e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/2bfea1d4584e654d2b94ccb5d3c66b0e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/2bfea1d4584e654d2b94ccb5d3c66b0e',
        contentType: 'image/jpeg',
        size: 11038843,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiajuzlxrzdbmcccliuvgbfk4qu556u2ftf272h2k5fp56lzitlvt4/176',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiccahx3vfwlvgvpjyoh4rik5ms76yrjkkd2nwcsvpzysquogyw5mm/{id}',
        metadata: {
          name: 'Primer día con Iris en casa',
          description: '',
          image:
            'ipfs://bafybeiajuzlxrzdbmcccliuvgbfk4qu556u2ftf272h2k5fp56lzitlvt4/176',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '150',
              trait_type: 'Height',
            },
            {
              value: '140,5',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72958237,
        timestamp: '2025-06-19T11:14:03Z',
        transactionHash:
          '0x32c574e48a4cc637f207349b784c563fe49fff64339b625203219350b2a234c1',
      },
      timeLastUpdated: '2025-06-19T11:14:25.917Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '177',
      tokenType: 'ERC1155',
      name: 'Primer día con Iris en casa',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeigrw73szy6iwnsj4igpdf4qonrrjtlksunt556f7kbygqmamdr25m/00000000000000000000000000000000000000000000000000000000000000b1',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b04e7850e254875fdedf00055cae105f',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b04e7850e254875fdedf00055cae105f',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b04e7850e254875fdedf00055cae105f',
        contentType: 'image/jpeg',
        size: 10773159,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidx6b6tgkjgl73ccm3qe3sqvylkkpzam6ojsnlnbqrlvu4lsgdpum/177',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeigrw73szy6iwnsj4igpdf4qonrrjtlksunt556f7kbygqmamdr25m/{id}',
        metadata: {
          name: 'Primer día con Iris en casa',
          description: '',
          image:
            'ipfs://bafybeidx6b6tgkjgl73ccm3qe3sqvylkkpzam6ojsnlnbqrlvu4lsgdpum/177',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '150',
              trait_type: 'Height',
            },
            {
              value: '140,5',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72958294,
        timestamp: '2025-06-19T11:16:05Z',
        transactionHash:
          '0xbcd25320b0572947608dfbf44ad747c2a53112c339d4b56c45fb9c70b9e0bb05',
      },
      timeLastUpdated: '2025-06-19T11:16:28.440Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '178',
      tokenType: 'ERC1155',
      name: 'Primer día con Iris en casa',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeihwltmqfunplv7hapmlrkjnrrabwxwrma4fo2yyseaa7md7trxe4y/00000000000000000000000000000000000000000000000000000000000000b2',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/8c3648d80cd45edf3949a90c1e6077ab',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/8c3648d80cd45edf3949a90c1e6077ab',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/8c3648d80cd45edf3949a90c1e6077ab',
        contentType: 'image/jpeg',
        size: 13087384,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiatrfdpqxz6m65aibi6byictlwo5svvmd2ssvt2l46s53ciokp2c4/178',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeihwltmqfunplv7hapmlrkjnrrabwxwrma4fo2yyseaa7md7trxe4y/{id}',
        metadata: {
          name: 'Primer día con Iris en casa',
          description: '',
          image:
            'ipfs://bafybeiatrfdpqxz6m65aibi6byictlwo5svvmd2ssvt2l46s53ciokp2c4/178',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '150',
              trait_type: 'Height',
            },
            {
              value: '140,5',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72958346,
        timestamp: '2025-06-19T11:17:55Z',
        transactionHash:
          '0xbed1745130eae6d5a26f5f871d9c7057598925075680939ebcb6dd332f62df25',
      },
      timeLastUpdated: '2025-06-19T11:18:15.106Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '179',
      tokenType: 'ERC1155',
      name: 'Primer día con Iris en casa',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeifzg527vxt7jniujd7ip3ubyj6237xc6dzj2sl57ctef5m53y3ghm/00000000000000000000000000000000000000000000000000000000000000b3',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/523fa7168b467ced9fa0deb2602390a3',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/523fa7168b467ced9fa0deb2602390a3',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/523fa7168b467ced9fa0deb2602390a3',
        contentType: 'image/jpeg',
        size: 7192499,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiboebziwc2bvsuebwqkepunyjqzph6pb2mqb4ebyt5ggi6k5jcaam/179',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeifzg527vxt7jniujd7ip3ubyj6237xc6dzj2sl57ctef5m53y3ghm/{id}',
        metadata: {
          name: 'Primer día con Iris en casa',
          description: '',
          image:
            'ipfs://bafybeiboebziwc2bvsuebwqkepunyjqzph6pb2mqb4ebyt5ggi6k5jcaam/179',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '150',
              trait_type: 'Height',
            },
            {
              value: '140,5',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72958429,
        timestamp: '2025-06-19T11:20:51Z',
        transactionHash:
          '0x3bcb2747e18bdd33ebc46c56c2b0a409f4cb34f8065733f608fae913d1ad40b9',
      },
      timeLastUpdated: '2025-06-19T11:21:19.216Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '180',
      tokenType: 'ERC1155',
      name: 'Primer día con Iris en casa',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeifvul46eoep45otmxbueg3bc2ou7kre2uphndzvqbvfbixo2cja34/00000000000000000000000000000000000000000000000000000000000000b4',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9610b235b910bcb22500b41ba8b07ef6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9610b235b910bcb22500b41ba8b07ef6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9610b235b910bcb22500b41ba8b07ef6',
        contentType: 'image/jpeg',
        size: 7625003,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifbh3dq5ls6ncqtylhqyz3ir334zu5ju5nl6svaieqsuhnkq4tfoa/180',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeifvul46eoep45otmxbueg3bc2ou7kre2uphndzvqbvfbixo2cja34/{id}',
        metadata: {
          name: 'Primer día con Iris en casa',
          description: '',
          image:
            'ipfs://bafybeifbh3dq5ls6ncqtylhqyz3ir334zu5ju5nl6svaieqsuhnkq4tfoa/180',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '150',
              trait_type: 'Height',
            },
            {
              value: '140,5',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72958488,
        timestamp: '2025-06-19T11:22:57Z',
        transactionHash:
          '0x036a0176ca9e2661d6cda8276bb67a98f33287431970d7ba91b2c4ec7ca2edba',
      },
      timeLastUpdated: '2025-06-19T11:23:37.031Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '181',
      tokenType: 'ERC1155',
      name: 'Primer día con Iris en casa',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeicfl7pkbc75qtei7zxfydul5vie7ommkq64qag43w3kp3txx2cvwa/00000000000000000000000000000000000000000000000000000000000000b5',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/9cbb47f6f89e3a70b209bf49858d0544',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/9cbb47f6f89e3a70b209bf49858d0544',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/9cbb47f6f89e3a70b209bf49858d0544',
        contentType: 'image/jpeg',
        size: 13393546,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeih6v3bdmtipzfwvrdvj7phfxr3sqxprscge4mgrm3ukxfslypr6tm/181',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeicfl7pkbc75qtei7zxfydul5vie7ommkq64qag43w3kp3txx2cvwa/{id}',
        metadata: {
          name: 'Primer día con Iris en casa',
          description: '',
          image:
            'ipfs://bafybeih6v3bdmtipzfwvrdvj7phfxr3sqxprscge4mgrm3ukxfslypr6tm/181',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '150',
              trait_type: 'Height',
            },
            {
              value: '140,5',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72958570,
        timestamp: '2025-06-19T11:25:51Z',
        transactionHash:
          '0x7f72825ea30ff7a7023e467a3c64dbfbcf573bc4c913a7a5e4410719ee0df4ee',
      },
      timeLastUpdated: '2025-06-19T11:26:16.676Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '182',
      tokenType: 'ERC1155',
      name: 'Un altar antiguo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeib7ydesxfh6wvlu4aaogbtfdpyfsjxzpukovx5kuunudx52b4r3za/00000000000000000000000000000000000000000000000000000000000000b6',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/5646bbe6c78f4f7557c7f692253a34a6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/5646bbe6c78f4f7557c7f692253a34a6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/5646bbe6c78f4f7557c7f692253a34a6',
        contentType: 'image/jpeg',
        size: 7128768,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiaixcfstjyofz3z5za7tzczpdk2xcc535ype4s2aa3v7bm34cgmuu/182',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeib7ydesxfh6wvlu4aaogbtfdpyfsjxzpukovx5kuunudx52b4r3za/{id}',
        metadata: {
          name: 'Un altar antiguo',
          description: '',
          image:
            'ipfs://bafybeiaixcfstjyofz3z5za7tzczpdk2xcc535ype4s2aa3v7bm34cgmuu/182',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '27',
              trait_type: 'Height',
            },
            {
              value: '27',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72993921,
        timestamp: '2025-06-20T08:21:21Z',
        transactionHash:
          '0x26280723e0ae92529e74008607187cbb5417a48a12be4bbade40cd768d73e3b5',
      },
      timeLastUpdated: '2025-06-20T08:22:22.937Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '183',
      tokenType: 'ERC1155',
      name: 'Un altar antiguo',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeih5bthrvzmwz6g3bod6yj4zxivyrjxtefwjnpop7m4325sti7geyy/00000000000000000000000000000000000000000000000000000000000000b7',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/7ddba28c32a8c5e6e48412d5341bafac',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/7ddba28c32a8c5e6e48412d5341bafac',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/7ddba28c32a8c5e6e48412d5341bafac',
        contentType: 'image/jpeg',
        size: 13435515,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiba56lpivxsgalf662crtwwtgbkuwzjut6kysjjfnteoo72cahxdy/183',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeih5bthrvzmwz6g3bod6yj4zxivyrjxtefwjnpop7m4325sti7geyy/{id}',
        metadata: {
          name: 'Un altar antiguo',
          description: '',
          image:
            'ipfs://bafybeiba56lpivxsgalf662crtwwtgbkuwzjut6kysjjfnteoo72cahxdy/183',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '27',
              trait_type: 'Height',
            },
            {
              value: '27',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72993972,
        timestamp: '2025-06-20T08:23:09Z',
        transactionHash:
          '0x3f1e944c9c0dd32d43d0007b1fc26d2ad36efc91135171237971c6833664a82e',
      },
      timeLastUpdated: '2025-06-20T08:23:55.126Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '184',
      tokenType: 'ERC1155',
      name: 'Estatuas en el jardín',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeifiygzgewz3ssyz2bwbt2uatrr46bddijdcxtrlnpvzib24p5o4xm/00000000000000000000000000000000000000000000000000000000000000b8',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/7553554bb5b8809e741ddd6db17aa40a',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/7553554bb5b8809e741ddd6db17aa40a',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/7553554bb5b8809e741ddd6db17aa40a',
        contentType: 'image/jpeg',
        size: 7013170,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihemrcpd2krpj23zfzhaxx2u56dxyagkzef62jieysf2g6s3ak2wu/184',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeifiygzgewz3ssyz2bwbt2uatrr46bddijdcxtrlnpvzib24p5o4xm/{id}',
        metadata: {
          name: 'Estatuas en el jardín',
          description: '',
          image:
            'ipfs://bafybeihemrcpd2krpj23zfzhaxx2u56dxyagkzef62jieysf2g6s3ak2wu/184',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '33',
              trait_type: 'Height',
            },
            {
              value: '33',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72994078,
        timestamp: '2025-06-20T08:26:53Z',
        transactionHash:
          '0xed4f0795cf803e209a86a01e1a099ab9a07a60964f04c35755d31bca18efc15b',
      },
      timeLastUpdated: '2025-06-20T08:27:13.301Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '185',
      tokenType: 'ERC1155',
      name: 'El auge de la ultraderecha',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiayggjd4qqylz6rp7yqkze2h7hyz4izanyvfur4y5nwta27sptxje/00000000000000000000000000000000000000000000000000000000000000b9',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/e08949ac044c9d63fc3948e347acd21c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/e08949ac044c9d63fc3948e347acd21c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/e08949ac044c9d63fc3948e347acd21c',
        contentType: 'image/jpeg',
        size: 6779512,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihiaktbsxodqokwtyqmbcryrtqy5ov3nfzgqn5uecwbfhrqv52xda/185',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiayggjd4qqylz6rp7yqkze2h7hyz4izanyvfur4y5nwta27sptxje/{id}',
        metadata: {
          name: 'El auge de la ultraderecha',
          description: '',
          image:
            'ipfs://bafybeihiaktbsxodqokwtyqmbcryrtqy5ov3nfzgqn5uecwbfhrqv52xda/185',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29,7',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72994149,
        timestamp: '2025-06-20T08:29:25Z',
        transactionHash:
          '0xd2f9d0cbe6468c039fa2abc23459b5bac0bb6efa312509367e27b06199f8c778',
      },
      timeLastUpdated: '2025-06-20T08:29:47.719Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '186',
      tokenType: 'ERC1155',
      name: 'EL apocalipsis se parece a un camping',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeie4w3aj2wjj26b7wxys6fcwchhpczd7tppsudufvkmonsmrpklv5m/00000000000000000000000000000000000000000000000000000000000000ba',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/b0acc8e37e7f83acb5299cedb0538300',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/b0acc8e37e7f83acb5299cedb0538300',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/b0acc8e37e7f83acb5299cedb0538300',
        contentType: 'image/jpeg',
        size: 7729891,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifcz2q2s4ynozlgq5j5f4gtirxaeo5w6yp3hhu42c2hrsozokhcpi/186',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeie4w3aj2wjj26b7wxys6fcwchhpczd7tppsudufvkmonsmrpklv5m/{id}',
        metadata: {
          name: 'EL apocalipsis se parece a un camping',
          description: '',
          image:
            'ipfs://bafybeifcz2q2s4ynozlgq5j5f4gtirxaeo5w6yp3hhu42c2hrsozokhcpi/186',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29,7',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72994206,
        timestamp: '2025-06-20T08:31:25Z',
        transactionHash:
          '0x8e8a248623d15596311457014cb4e9b0e5ee3c1d204dd7d5bce742169309f831',
      },
      timeLastUpdated: '2025-06-20T08:32:02.148Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '187',
      tokenType: 'ERC1155',
      name: 'Realidad virtual',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeibxxmh4b6wwvronln6bfnrttmyadzuvwljidfglmoqmw6egiztndy/00000000000000000000000000000000000000000000000000000000000000bb',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/0e97dedaaa978f17e4e40e49339fa6b6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/0e97dedaaa978f17e4e40e49339fa6b6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/0e97dedaaa978f17e4e40e49339fa6b6',
        contentType: 'image/jpeg',
        size: 7459440,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeihu6gw2ztdcaepfc4dbt4vba3ifyhag5wahbpjcnfzkcwspbpfyh4/187',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeibxxmh4b6wwvronln6bfnrttmyadzuvwljidfglmoqmw6egiztndy/{id}',
        metadata: {
          name: 'Realidad virtual',
          description: '',
          image:
            'ipfs://bafybeihu6gw2ztdcaepfc4dbt4vba3ifyhag5wahbpjcnfzkcwspbpfyh4/187',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29,7',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2025-06-23T07:02:19.125Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '188',
      tokenType: 'ERC1155',
      name: 'Realidad virtual',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiadwxedkjoluvsdg6afsoftwb62y2g2fuizr6s2ltogwaaadytkrq/00000000000000000000000000000000000000000000000000000000000000bc',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/0eb07a294d3fe4b7b0c074e59c63bbf6',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/0eb07a294d3fe4b7b0c074e59c63bbf6',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/0eb07a294d3fe4b7b0c074e59c63bbf6',
        contentType: 'image/jpeg',
        size: 11153973,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeicxsaf2j6jtc5jxrargoxpudlygzoautltuvhiwjuzjd25vpthbiy/188',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiadwxedkjoluvsdg6afsoftwb62y2g2fuizr6s2ltogwaaadytkrq/{id}',
        metadata: {
          name: 'Realidad virtual',
          description: '',
          image:
            'ipfs://bafybeicxsaf2j6jtc5jxrargoxpudlygzoautltuvhiwjuzjd25vpthbiy/188',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29,7',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72994475,
        timestamp: '2025-06-20T08:40:57Z',
        transactionHash:
          '0xefbc1f645900615ccc21ac749af18d6c869c115d30d7eed68219f739bed7d848',
      },
      timeLastUpdated: '2025-06-20T08:42:06.362Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '189',
      tokenType: 'ERC1155',
      name: 'EL apocalipsis se parece a un camping',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeic2lziiylnm3fzlwoxixyqxqz5a7hmecnnscsmem54axk2fcg2lq4/00000000000000000000000000000000000000000000000000000000000000bd',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/e00764e6d77a3f99492a7e82d941bd0d',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/e00764e6d77a3f99492a7e82d941bd0d',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/e00764e6d77a3f99492a7e82d941bd0d',
        contentType: 'image/jpeg',
        size: 11822767,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiah6yjtihg73fxeajcbezidqeu5u4qglhwq6ulojxucsqf34ea7sq/189',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic2lziiylnm3fzlwoxixyqxqz5a7hmecnnscsmem54axk2fcg2lq4/{id}',
        metadata: {
          name: 'EL apocalipsis se parece a un camping',
          description: '',
          image:
            'ipfs://bafybeiah6yjtihg73fxeajcbezidqeu5u4qglhwq6ulojxucsqf34ea7sq/189',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29,7',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72994529,
        timestamp: '2025-06-20T08:42:53Z',
        transactionHash:
          '0xaafd95dd4239927e288446b34e4bf074ad77547ebcdf714e63db09cd201862f8',
      },
      timeLastUpdated: '2025-06-20T08:44:08.920Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '190',
      tokenType: 'ERC1155',
      name: 'EL apocalipsis se parece a un camping',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeiccj2l6irlq24ehn6d53jyhy354dfdo3fs25w6d3ckf74eess4qzy/00000000000000000000000000000000000000000000000000000000000000be',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/8bd4c5d81e63e744955526b085a97d83',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/8bd4c5d81e63e744955526b085a97d83',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/8bd4c5d81e63e744955526b085a97d83',
        contentType: 'image/jpeg',
        size: 11907504,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeifstzskktuj6jv2k2atggkkd3grhlruxgvoqucgmxs33eqmtrakse/190',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeiccj2l6irlq24ehn6d53jyhy354dfdo3fs25w6d3ckf74eess4qzy/{id}',
        metadata: {
          name: 'EL apocalipsis se parece a un camping',
          description: '',
          image:
            'ipfs://bafybeifstzskktuj6jv2k2atggkkd3grhlruxgvoqucgmxs33eqmtrakse/190',
          attributes: [
            {
              value: 'Watercolor on paper',
              trait_type: 'Medium',
            },
            {
              value: '29,7',
              trait_type: 'Height',
            },
            {
              value: '21',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Detail',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72994607,
        timestamp: '2025-06-20T08:45:37Z',
        transactionHash:
          '0x1564305534bf276de483403dcc017a204c246c4b56e545d7b7112b4ad896cb5f',
      },
      timeLastUpdated: '2025-06-20T08:46:20.516Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '191',
      tokenType: 'ERC1155',
      name: 'Asunción',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeihdgljwlaztrteogy6k5jtxlntadxo56wcz2bec3mtizbhcxzyzyu/00000000000000000000000000000000000000000000000000000000000000bf',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/edfdcfa6d0f7ff699f4b3ec4842d85c3',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/edfdcfa6d0f7ff699f4b3ec4842d85c3',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/edfdcfa6d0f7ff699f4b3ec4842d85c3',
        contentType: 'image/jpeg',
        size: 2288239,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeidinqyjk3mkdui3tttddn3upq2kxxckrkyfy266iqpzs63t7krtbi/191',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeihdgljwlaztrteogy6k5jtxlntadxo56wcz2bec3mtizbhcxzyzyu/{id}',
        metadata: {
          name: 'Asunción',
          description: '',
          image:
            'ipfs://bafybeidinqyjk3mkdui3tttddn3upq2kxxckrkyfy266iqpzs63t7krtbi/191',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '195',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Work in progress',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72994856,
        timestamp: '2025-06-20T08:54:27Z',
        transactionHash:
          '0xaeb934b83060eefb6ca0de0d527efdba5f5fe3b8eed4526365da97d16af06b8c',
      },
      timeLastUpdated: '2025-06-20T08:55:01.635Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '192',
      tokenType: 'ERC1155',
      name: 'Asunción',
      tokenUri:
        'https://alchemy.mypinata.cloud/ipfs/bafybeibxxmh4b6wwvronln6bfnrttmyadzuvwljidfglmoqmw6egiztndy/00000000000000000000000000000000000000000000000000000000000000c0',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/3fe0f2d46db245af31fe82b563d9a3f2',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/3fe0f2d46db245af31fe82b563d9a3f2',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/3fe0f2d46db245af31fe82b563d9a3f2',
        contentType: 'image/jpeg',
        size: 1926648,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeic6esa3qrmb5hjqtewdd2lmmynbfn33xpeql5yrekere6cm747ium/192',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeibxxmh4b6wwvronln6bfnrttmyadzuvwljidfglmoqmw6egiztndy/{id}',
        metadata: {
          name: 'Asunción',
          description: '',
          image:
            'ipfs://bafybeic6esa3qrmb5hjqtewdd2lmmynbfn33xpeql5yrekere6cm747ium/192',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '195',
              trait_type: 'Height',
            },
            {
              value: '130',
              trait_type: 'Width',
            },
            {
              value: '2015',
              trait_type: 'Year',
            },
            {
              value: 'Work in progress',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 72994897,
        timestamp: '2025-06-20T08:55:55Z',
        transactionHash:
          '0x5f3085c7d8f5550ba6ed8141d19704a4848dd030fee262ab29807d8a43567953',
      },
      timeLastUpdated: '2025-06-20T08:56:43.272Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '193',
      tokenType: 'ERC1155',
      name: 'Primer día con Iris en casa',
      tokenUri:
        'https://ipfs.io/ipfs/bafybeic5voczvgo5gd6bj7oznvibmi6pp6mrov6hnsciqsuefdfjzl7uru/00000000000000000000000000000000000000000000000000000000000000c1',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/48c9f0ae598fd6fe78b7bf8661a53178',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/48c9f0ae598fd6fe78b7bf8661a53178',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/48c9f0ae598fd6fe78b7bf8661a53178',
        contentType: 'image/jpeg',
        size: 6527028,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeic7wseihyibkjovctfjjok7l4qwjamnfbkyw7sooniafdoqco3i6m/193',
      },
      raw: {
        tokenUri:
          'ipfs://bafybeic5voczvgo5gd6bj7oznvibmi6pp6mrov6hnsciqsuefdfjzl7uru/{id}',
        metadata: {
          name: 'Primer día con Iris en casa',
          description: '',
          image:
            'ipfs://bafybeic7wseihyibkjovctfjjok7l4qwjamnfbkyw7sooniafdoqco3i6m/193',
          attributes: [
            {
              value: 'Oil on canvas',
              trait_type: 'Medium',
            },
            {
              value: '150',
              trait_type: 'Height',
            },
            {
              value: '140,5',
              trait_type: 'Width',
            },
            {
              value: '2025',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      mint: {
        mintAddress: '0xd7d089b7ebeccaf4ff8f183f22376913ce6193b9',
        blockNumber: 73209899,
        timestamp: '2025-06-25T16:24:23Z',
        transactionHash:
          '0x2e17edd0a0f1555a35a814bc475fb6b1f8c9fa5db1d08e4dda8d8a07ab75c9a4',
      },
      timeLastUpdated: '2025-06-25T16:25:09.199Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '194',
      tokenType: 'ERC1155',
      name: 'Piso de estudiantes',
      tokenUri:
        'https://ipfs.io/ipfs/QmTohDf3RudAnnqKhxhfUjk88erQYm38FkP5C2vXLk3QW7/00000000000000000000000000000000000000000000000000000000000000c2',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/e2f63c2ba1f70fabbe0e9dbac7b6f3a9',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/e2f63c2ba1f70fabbe0e9dbac7b6f3a9',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/e2f63c2ba1f70fabbe0e9dbac7b6f3a9',
        contentType: 'image/jpeg',
        size: 5870793,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeiegp3o46ovrjqlbu2cqp5bs2g4zm26eaxpmzynvetgpesbieyalya',
      },
      raw: {
        tokenUri: 'ipfs://QmTohDf3RudAnnqKhxhfUjk88erQYm38FkP5C2vXLk3QW7/{id}',
        metadata: {
          name: 'Piso de estudiantes',
          image:
            'ipfs://bafybeiegp3o46ovrjqlbu2cqp5bs2g4zm26eaxpmzynvetgpesbieyalya',
          attributes: [
            {
              value: 'Oil on canvas on cardboard',
              trait_type: 'Medium',
            },
            {
              value: '162',
              trait_type: 'Height',
            },
            {
              value: '116',
              trait_type: 'Width',
            },
            {
              value: '2007',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2026-03-16T16:51:46.127Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '195',
      tokenType: 'ERC1155',
      name: 'Rockets win I',
      tokenUri:
        'https://ipfs.io/ipfs/QmUpakiPTYpediFgLUFBDDwU9haENqJtTDDCpYpWA35hxK/00000000000000000000000000000000000000000000000000000000000000c3',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/6c1140b08635a74853c1b4f5ef03e463_4a69984e',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/6c1140b08635a74853c1b4f5ef03e463_4a69984e',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/6c1140b08635a74853c1b4f5ef03e463_4a69984e',
        contentType: 'image/jpeg',
        size: 13257149,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeigipyrbcyhi4flek4hxt4tgqshfqvw5i366ykubd7k7oljdvvhqva',
      },
      raw: {
        tokenUri: 'ipfs://QmUpakiPTYpediFgLUFBDDwU9haENqJtTDDCpYpWA35hxK/{id}',
        metadata: {
          name: 'Rockets win I',
          image:
            'ipfs://bafybeigipyrbcyhi4flek4hxt4tgqshfqvw5i366ykubd7k7oljdvvhqva',
          attributes: [
            {
              value: 'Oil on canvas on cardboard',
              trait_type: 'Medium',
            },
            {
              value: '25',
              trait_type: 'Height',
            },
            {
              value: '20',
              trait_type: 'Width',
            },
            {
              value: '2026',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2026-04-17T08:08:49.797Z',
    },
    {
      contract: {
        address: '0x2059eA8350FA506df249327510e592140905e026',
        name: 'Juanma Moreno Certificates of Authenticity.',
        symbol: 'MORENO',
        tokenType: 'ERC1155',
        contractDeployer: '0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9',
        deployedBlockNumber: 50765524,
        openSeaMetadata: {
          collectionName: 'Juanma Moreno Certificates of Authenticity.',
          collectionSlug: 'juanma-moreno-certificates-of-authenticity-1',
          safelistRequestStatus: 'not_requested',
          imageUrl:
            'https://i2c.seadn.io/polygon/f5a850dda98b43f6ae34d8858736bb7f/ce697c73d887e7322afafb06ce289c/face697c73d887e7322afafb06ce289c.jpeg',
          description: '1',
          lastIngestedAt: '2026-06-13T14:15:01.000Z',
        },
        spamClassifications: [],
      },
      tokenId: '196',
      tokenType: 'ERC1155',
      name: 'Rockets win II',
      tokenUri:
        'https://ipfs.io/ipfs/QmUpakiPTYpediFgLUFBDDwU9haENqJtTDDCpYpWA35hxK/00000000000000000000000000000000000000000000000000000000000000c4',
      image: {
        cachedUrl:
          'https://nft2-cdn.alchemy.com/matic-mainnet/4c7df23db3fdd728dc0a4fac22d12e1b_94b3565c',
        thumbnailUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/thumbnailv2/matic-mainnet/4c7df23db3fdd728dc0a4fac22d12e1b_94b3565c',
        pngUrl:
          'https://res.cloudinary.com/alchemyapi/image/upload/convert-png/matic-mainnet/4c7df23db3fdd728dc0a4fac22d12e1b_94b3565c',
        contentType: 'image/jpeg',
        size: 16671933,
        originalUrl:
          'https://ipfs.io/ipfs/bafybeigorgxf2tknogo6ybu5h7wjwo2k4sw5aywab2s4b4qlfyjmtbroxe',
      },
      raw: {
        tokenUri: 'ipfs://QmUpakiPTYpediFgLUFBDDwU9haENqJtTDDCpYpWA35hxK/{id}',
        metadata: {
          name: 'Rockets win II',
          image:
            'ipfs://bafybeigorgxf2tknogo6ybu5h7wjwo2k4sw5aywab2s4b4qlfyjmtbroxe',
          attributes: [
            {
              value: 'Oil on canvas on cardboard',
              trait_type: 'Medium',
            },
            {
              value: '25',
              trait_type: 'Height',
            },
            {
              value: '20',
              trait_type: 'Width',
            },
            {
              value: '2026',
              trait_type: 'Year',
            },
            {
              value: 'Frontal view',
              trait_type: 'Image Type',
            },
            {
              value: 'Juanma Moreno Sánchez',
              trait_type: 'Artist',
            },
            {
              value: 'cm',
              trait_type: 'Unit',
            },
          ],
        },
      },
      collection: {
        name: 'Juanma Moreno Certificates of Authenticity.',
        slug: 'juanma-moreno-certificates-of-authenticity-1',
      },
      timeLastUpdated: '2026-04-17T08:08:50.583Z',
    },
  ],
};
