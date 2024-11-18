import {
  getAdditionalField,
  getAdditionalFieldNumberOrEmpty,
  getAddress,
  getEuroKey,
  getNumberByArrayIndex,
  getPhotoURL,
  getPlanURL,
  getPosition,
  getStringByArrayIndex,
} from "../getters";
import { FieldConfig, ImportErrorLevel } from "../types";
import {
  addressValidator,
  euroKeyValidator,
  gripValidator,
  imageURLValidator,
  nonEmptyStringValidator,
  positionValidator,
  numberByIndexValidator,
  numberAdditionalFieldValidator,
  nonEmptyAdditionalFieldValidator,
} from "../validators";

/*
 This mapping descriptor is for data that we receive from CBF (https://www.cbf-muenchen.de/) and it assumes the following
 order of the csv headers:
 ['id', 'title', 'alias', 'type', 'catid', 'short_description', 'description', 'generate_coordinates', 'geodata', 'latitude', 'longitude',
 'geo_x', 'geo_y', 'geo_z', 'zoom', 'street', 'street_no', 'addr_addinfo', 'zip_code', 'city', 'region', 'country', 'phone', 'url', 'email',
 'additional_fields', 'images', 'icons', 'state', 'created', 'created_by', 'modified', 'modified_by', 'publish_up', 'publish_down',
 'checked_out', 'checked_out_time', 'ordering', 'metakey', 'metadesc', 'metadata', 'access', 'hits', 'featured', 'language', 'version', 'params']
 */

export const mappings: Array<FieldConfig> = [
  {
    fieldName: "title",
    getter: getStringByArrayIndex(1),
    validator: nonEmptyStringValidator(1),
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "short_description",
    getter: getStringByArrayIndex(5),
    validator: nonEmptyStringValidator(5),
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "photo",
    getter: getPhotoURL,
    validator: imageURLValidator,
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "plan",
    getter: getPlanURL,
    validator: imageURLValidator,
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "position",
    getter: getPosition,
    validator: positionValidator,
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "address",
    getter: getAddress,
    validator: addressValidator,
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "eurokey",
    getter: getEuroKey,
    validator: euroKeyValidator,
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "ramp_steepness",
    getter: getAdditionalFieldNumberOrEmpty("wc_ramp_incline"),
    validator: numberAdditionalFieldValidator("wc_ramp_incline"),
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "ramp_length",
    getter: getAdditionalFieldNumberOrEmpty("wc_ramp_length"),
    validator: numberAdditionalFieldValidator("wc_ramp_length"),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "city",
    getter: getStringByArrayIndex(19),
    validator: nonEmptyStringValidator(19),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "modified",
    getter: getStringByArrayIndex(31),
    validator: nonEmptyStringValidator(31),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "direction",
    getter: getStringByArrayIndex(6),
    validator: nonEmptyStringValidator(6),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "zip_code",
    getter: getNumberByArrayIndex(18),
    validator: numberByIndexValidator(18),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "id",
    getter: getNumberByArrayIndex(0),
    validator: numberByIndexValidator(0),
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "cbf_id",
    getter: getNumberByArrayIndex(0),
    validator: numberByIndexValidator(0),
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "wc_details",
    getter: getAdditionalField("wc_addinfo"),
    validator: nonEmptyAdditionalFieldValidator("wc_addinfo"),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "wc_accessright",
    getter: getAdditionalField("wc_accessright"),
    // validator: numberAdditionalFieldValidator("wc_accessright"),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "wc_accessleft",
    getter: getAdditionalField("wc_accessleft"),
    // validator: numberAdditionalFieldValidator("wc_accessleft"),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "interior_description",
    getter: getAdditionalField("wc_roominfos"),
    validator: nonEmptyAdditionalFieldValidator("wc_roominfos"),
    errorLevel: ImportErrorLevel.WARNING,
  },
  {
    fieldName: "grip",
    getter: getAdditionalField("wc_wheregrip"),
    validator: gripValidator,
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "door_width",
    getter: getAdditionalField("wc_door_width"),
    validator: numberAdditionalFieldValidator("wc_door_width"),
    errorLevel: ImportErrorLevel.ERROR,
  },
  {
    fieldName: "access",
    getter: getAdditionalField("wc_infos"),
    validator: nonEmptyAdditionalFieldValidator("wc_infos"),
    errorLevel: ImportErrorLevel.WARNING,
  },
];
