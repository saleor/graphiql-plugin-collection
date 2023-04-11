interface OperationProps {
  name: string;
  created: string;
  type: string
}

export default function Operation({ name, created, type }: OperationProps) {
  return (
    <div className="collection-plugin-operation">
      {type === 'query' ?
        <div
          className='collection-plugin-operation-type collection-plugin-operation-query'
        >
          Q
        </div> :
        <div
          className='collection-plugin-operation-type collection-plugin-operation-mutation'
        >
          M
        </div>
      }
      <div className="collection-plugin-operation-item">
        <div className="flex-1 truncate px-4">
          <div>
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}
