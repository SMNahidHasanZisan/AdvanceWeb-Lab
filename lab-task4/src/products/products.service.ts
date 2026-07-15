import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/createproduct.dto';
import { PartialUpdateProductDto } from './dto/partialupdateproduct.dto';
import { UpdateProductDto } from './dto/updateproduct.dto';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  async findAll() {
    const products = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'All products fetched successfully',
      count: products.length,
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    await this.findProductOrFail(id);
    await this.productsRepo.update(id, dto);
    const product = await this.findProductOrFail(id);

    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  async replace(id: number, dto: UpdateProductDto) {
    const product = await this.findProductOrFail(id);
    Object.assign(product, dto);
    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product replaced successfully',
      data: savedProduct,
    };
  }

  async remove(id: number) {
    const result = await this.productsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return {
      message: 'Product deleted successfully',
      id,
    };
  }

  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: { category },
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products fetched by category successfully',
      count: products.length,
      data: products,
    };
  }

  async search(keyword: string) {
    const products = await this.productsRepo.find({
      where: { name: ILike(`%${keyword ?? ''}%`) },
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products searched successfully',
      count: products.length,
      data: products,
    };
  }

  async toggleActive(id: number) {
    const product = await this.findProductOrFail(id);
    product.isActive = !product.isActive;
    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product active status toggled successfully',
      data: savedProduct,
    };
  }

  private async findProductOrFail(id: number): Promise<Products> {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }
}
