jest.mock('../components/FuelTypes')

import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import FuelTypes from '../components/FuelTypes'
import FuelTypesContainer from './FuelTypesContainer'

describe('routes', () => {
  describe('organizations', () => {
    describe('routes', () => {
      describe('aircraft', () => {
        describe('routes', () => {
          describe('settings', () => {
            describe('containers', () => {
              describe('FuelTypesContainer', () => {
                let wrapper
                let component
                let container

                beforeEach(() => {
                  jest.resetAllMocks()

                  const state = {
                    firestore: {
                      data: {
                        organizationAircrafts: {
                          o7flC7jw8jmkOfWo8oyA: {
                            registration: 'HBKFW',
                            settings: {
                              fuelTypes: [
                                { name: 'avgas', description: 'AvGas' },
                                { name: 'mogas', description: 'MoGas' }
                              ]
                            }
                          }
                        }
                      }
                    }
                  }
                  const store = configureStore()(state)

                  const props = {
                    aircraftId: 'o7flC7jw8jmkOfWo8oyA'
                  }

                  wrapper = renderer.create(
                    <Provider store={store}>
                      <FuelTypesContainer {...props} />
                    </Provider>
                  )

                  container = wrapper.root.find(
                    el => el.type === FuelTypesContainer
                  )
                  component = container.find(el => el.type === FuelTypes)
                })

                it('should render both the container and the component ', () => {
                  expect(container).toBeTruthy()
                  expect(component).toBeTruthy()
                })

                it('should map state to props', () => {
                  const expectedPropKeys = ['types']

                  expect(Object.keys(component.props)).toEqual(
                    expect.arrayContaining(expectedPropKeys)
                  )
                })

                it('should map dispatch to props', () => {
                  const expectedPropKeys = []

                  expect(Object.keys(component.props)).toEqual(
                    expect.arrayContaining(expectedPropKeys)
                  )
                })
              })
            })
          })
        })
      })
    })
  })
})
