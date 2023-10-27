import { PageProduct } from '../models';

const getAllInfoById = async (id: string) => {
  const product = await PageProduct.findOne({
    where: {
      id,
    },
  });

  return product;
};

export default { getAllInfoById };
