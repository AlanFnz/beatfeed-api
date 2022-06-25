import { Types } from 'mongoose';

import LabelsDao from "../dao/labels.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateLabelDto } from "../dto/create.label.dto";
import { PutLabelDto } from "../dto/put.label.dto";
import { PatchLabelDto } from "../dto/patch.label.dto";

class LabelsService implements CRUD {
  async create(resource: CreateLabelDto) {
    return LabelsDao.addLabel(resource);
  }

  async deleteById(id: Types.ObjectId) {
    return LabelsDao.removeLabelById(id);
  }

  async list(limit: number, page: number) {
    return LabelsDao.getLabels(limit, page);
  }

  async patchById(id: Types.ObjectId, resource: PatchLabelDto) {
    return LabelsDao.updateLabelById(id, resource);
  }

  async readById(id: Types.ObjectId) {
    return LabelsDao.getLabelById(id);
  }

  async putById(id: Types.ObjectId, resource: PutLabelDto) {
    return LabelsDao.updateLabelById(id, resource);
  }
}

export default new LabelsService();
