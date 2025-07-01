import './App.css'
import ProductTable from './components/ProductTable'
function App() {
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Bảng Giá Sản Phẩm</h1>
        <ProductTable />
      </div>
    </div>
  )
}

export default App
