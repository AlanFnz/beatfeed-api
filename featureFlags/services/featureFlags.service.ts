import { Types } from 'mongoose';

import FeatureFlagsDao from "../dao/featureFlags.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";

class FeatureFlagsService implements CRUD {
  async create(resource: CreateUserDto) {
    return FeatureFlagsDao.addFeature(resource);
  }

  async deleteById(id: Types.ObjectId) {
    return FeatureFlagsDao.removeFeatureById(id);
  }

  async list(limit: number, page: number) {
    return FeatureFlagsDao.getFeatures(limit, page);
  }

  async patchById(id: Types.ObjectId, resource: PatchUserDto) {
    return FeatureFlagsDao.updateFeatureById(id, resource);
  }

  async readById(id: Types.ObjectId) {
    return FeatureFlagsDao.getFeatureById(id);
  }

  async putById(id: Types.ObjectId, resource: PutUserDto) {
    return FeatureFlagsDao.updateFeatureById(id, resource);
  }
}

export default new FeatureFlagsService();
