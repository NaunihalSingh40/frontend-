"use client";
import { useState, useEffect } from "react";

const AssetTable = () => {
  const [assets, setAssets] = useState([
    {
      id: 1,
      user: "Bernardo Galaviz",
      name: "Dell Laptop",
      assetId: "#AST-0007",
      purchaseDate: "5 Jan 2019",
      warranty: "12 Months",
      warrantyEnd: "5 Jan 2020",
      amount: "$1215",
      status: "Pending",
    },
    {
      id: 2,
      user: "Catherine Manseau",
      name: "Canon Portable Printer",
      assetId: "#AST-0012",
      purchaseDate: "14 Jan 2019",
      warranty: "12 Months",
      warrantyEnd: "14 Jan 2020",
      amount: "$2500",
      status: "Returned",
    },
    // Additional sample data
  ]);

  const [filteredAssets, setFilteredAssets] = useState(assets);
  const [newAssetModal, setNewAssetModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    user: "",
    name: "",
    assetId: "",
    purchaseDate: "",
    warranty: "12 Months",
    warrantyEnd: "",
    amount: "",
    status: "Pending",
  });

  // Search state
  const [search, setSearch] = useState({
    user: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const { user, status, startDate, endDate } = search;
    setFilteredAssets(
      assets.filter((asset) => {
        const matchesUser = user
          ? asset.user.toLowerCase().includes(user.toLowerCase())
          : true;
        const matchesStatus = status ? asset.status === status : true;
        const matchesStartDate = startDate
          ? new Date(asset.purchaseDate) >= new Date(startDate)
          : true;
        const matchesEndDate = endDate
          ? new Date(asset.purchaseDate) <= new Date(endDate)
          : true;
        return (
          matchesUser && matchesStatus && matchesStartDate && matchesEndDate
        );
      })
    );
  }, [search, assets]);

  const openNewAssetModal = () => {
    setNewAssetModal(true);
  };

  const closeNewAssetModal = () => {
    setNewAssetModal(false);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleNewAssetChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const addNewAsset = () => {
    if (
      !newAsset.user ||
      !newAsset.name ||
      !newAsset.assetId ||
      !newAsset.purchaseDate ||
      !newAsset.warrantyEnd ||
      !newAsset.amount
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setAssets([...assets, { id: assets.length + 1, ...newAsset }]);
    setNewAssetModal(false);
    setNewAsset({
      user: "",
      name: "",
      assetId: "",
      purchaseDate: "",
      warranty: "12 Months",
      warrantyEnd: "",
      amount: "",
      status: "Pending",
    });
  };

  return (
    <div className="min-h-screen bg-white text-blue-900 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">Assets</h1>
        <button
          onClick={openNewAssetModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add Asset
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          name="user"
          placeholder="Employee Name"
          value={search.user}
          onChange={handleSearchChange}
          className="bg-gray-100 p-2 border border-gray-300 rounded w-1/3"
        />
        <select
          name="status"
          value={search.status}
          onChange={handleSearchChange}
          className="bg-gray-100 p-2 border border-gray-300 rounded w-1/3 text-gray-400"
        >
          <option value="">-- Select Status --</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Returned">Returned</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={search.startDate}
          onChange={handleSearchChange}
          className="bg-gray-100 p-2 border border-gray-300 rounded w-1/3 text-gray-400"
        />
        <input
          type="date"
          name="endDate"
          value={search.endDate}
          onChange={handleSearchChange}
          className="bg-gray-100 p-2 border border-gray-300 rounded w-1/3 text-gray-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-100 border border-gray-300">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">Asset User</th>
              <th className="p-3">Asset Name</th>
              <th className="p-3">Asset ID</th>
              <th className="p-3">Purchase Date</th>
              <th className="p-3">Warranty</th>
              <th className="p-3">Warranty End</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr
                key={asset.id}
                className="border-b border-gray-300 text-blue-900"
              >
                <td className="p-3">{asset.user}</td>
                <td className="p-3">{asset.name}</td>
                <td className="p-3">{asset.assetId}</td>
                <td className="p-3">{asset.purchaseDate}</td>
                <td className="p-3">{asset.warranty}</td>
                <td className="p-3">{asset.warrantyEnd}</td>
                <td className="p-3">{asset.amount}</td>
                <td className="p-3">
                  <select
                    className="bg-gray-100 border border-gray-300 p-2 rounded"
                    value={asset.status}
                    onChange={(e) =>
                      handleStatusChange(asset.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Returned">Returned</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {newAssetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-[40vw] h-[68vh] overflow-y-auto relative flex flex-col">
            <h2 className="text-lg font-bold mb-4">Add New Asset</h2>

            <form className="space-y-4 grid grid-cols-1  gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Asset User:
                </label>
                <input
                  type="text"
                  name="user"
                  value={newAsset.user}
                  onChange={handleNewAssetChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Asset Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={newAsset.name}
                  onChange={handleNewAssetChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Asset ID:
                </label>
                <input
                  type="text"
                  name="assetId"
                  value={newAsset.assetId}
                  onChange={handleNewAssetChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Purchase Date:
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={newAsset.purchaseDate}
                  onChange={handleNewAssetChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Warranty End:
                </label>
                <input
                  type="date"
                  name="warrantyEnd"
                  value={newAsset.warrantyEnd}
                  onChange={handleNewAssetChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount:
                </label>
                <input
                  type="text"
                  name="amount"
                  value={newAsset.amount}
                  onChange={handleNewAssetChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status:
                </label>
                <select
                  name="status"
                  value={newAsset.status}
                  onChange={handleNewAssetChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>
              <br />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  onClick={closeNewAssetModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={addNewAsset}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetTable;
