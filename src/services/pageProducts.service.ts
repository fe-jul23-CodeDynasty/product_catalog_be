import { PageProduct } from '../models';

const getById = async (id: string): Promise<PageProduct | null> => {
  const product: PageProduct | null = await PageProduct.findOne({
    where: {
      id,
    },
  });

  return product;
};

export default { getById };
