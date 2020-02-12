/*
*                      Copyright 2020 Salto Labs Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with
* the License.  You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { DiffGraphTransformer } from '@salto/dag'
import { ChangeDataType, ElemID, Change } from 'adapter-api'

export type PlanTransformer = DiffGraphTransformer<ChangeDataType>

export const changeId = ({ elemID }: { elemID: ElemID }, action: Change['action']): string =>
  `${elemID.getFullName()}/${action}`