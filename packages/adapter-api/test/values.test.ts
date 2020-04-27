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

import { ElemID } from '../src/element_id'
import { StaticFile, isEqualValues, VariableExpression,
  ReferenceExpression } from '../src/values'

describe('Values', () => {
  describe('ReferenceExpression.createWithValue', () => {
    it('should return correct type', () => {
      const varElemId = new ElemID(ElemID.VARIABLES_NAMESPACE, 'varName')
      const varExp = new VariableExpression(varElemId, 17)
      const varExpAsRef = varExp as ReferenceExpression
      const newVarExp = varExpAsRef.createWithValue(undefined)
      expect(newVarExp instanceof VariableExpression).toBe(true)
      expect(newVarExp.value).toBe(undefined)
    })
    it('should return correct value', () => {
      const varElemId = new ElemID(ElemID.VARIABLES_NAMESPACE, 'varName')
      const varExp = new VariableExpression(varElemId, 17)
      const newVarExp = varExp.createWithValue(16)
      expect(newVarExp.value).toBe(16)
    })
  })

  describe('StaticFile', () => {
    describe('equality (direct)', () => {
      it('equals', () => {
        const fileFunc1 = new StaticFile('some/path.ext', Buffer.from('ZOMG'))
        const fileFunc2 = new StaticFile('some/path.ext', Buffer.from('ZOMG'))
        expect(fileFunc1.isEqual(fileFunc2)).toEqual(true)
      })
      it('unequals', () => {
        const fileFunc1 = new StaticFile('some/path.ext', Buffer.from('ZOMG'))
        const fileFunc2 = new StaticFile('some/path.ext', Buffer.from('ZOMG1'))
        expect(fileFunc1.isEqual(fileFunc2)).toEqual(false)
      })
    })
    describe('equality (via isEqualValues)', () => {
      it('equals by hash', () => {
        const fileFunc1 = new StaticFile('some/path.ext', Buffer.from('ZOMG'))
        const fileFunc2 = new StaticFile('some/path.ext', Buffer.from('ZOMG'))
        expect(isEqualValues(fileFunc1, fileFunc2)).toEqual(true)
      })
      it('unequals', () => {
        const fileFunc1 = new StaticFile('some/path.ext', Buffer.from('ZOMG'))
        const fileFunc2 = new StaticFile('some/path.ext', Buffer.from('ZOMG1'))
        expect(isEqualValues(fileFunc1, fileFunc2)).toEqual(false)
      })
    })
  })
})
