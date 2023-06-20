import React from 'react'

export default function DogElements({ result }) {
  return (
    <div>
        {result? (
            result.length > 0? (
                result.map(element => {
                  return (
                    <div key = { element.name }>
                      {element.name}
                      <img src={element.image_link} alt="No img"/>
                    </div>
                  )
                })
              ) : (
                <div>
                    Invalid name!
                </div>
              )
          ) : (
            void 0
        )}
    </div>
    )
}