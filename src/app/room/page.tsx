'use client';

import React, { useState, useEffect } from 'react';
import { FaBed, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  availability: boolean;
}

const roomTypes = [
  { type: 'Deluxe', price: 1000000 },
  { type: 'Suite', price: 2000000 },
  { type: 'Standard', price: 800000 },
];

const formatRupiah = (price: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
};

const Page = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [newRoom, setNewRoom] = useState({ id: 0, name: '', type: '', price: 0, availability: true });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setRooms([
      { id: 1, name: 'Deluxe Room', type: 'Deluxe', price: 1000000, availability: true },
      { id: 2, name: 'Suite Room', type: 'Suite', price: 2000000, availability: false },
      { id: 3, name: 'Standard Room', type: 'Standard', price: 800000, availability: true },
    ]);
  }, []);

  const handleAddRoom = () => {
    if (!newRoom.name || !newRoom.type) {
      alert('Semua field harus diisi!');
      return;
    }
    setRooms([...rooms, { ...newRoom, id: rooms.length + 1 }]);
    setNewRoom({ id: 0, name: '', type: '', price: 0, availability: true });
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setModalOpen(true);
  };

  const handleUpdateRoom = () => {
    if (editingRoom) {
      setRooms(rooms.map(room => (room.id === editingRoom.id ? editingRoom : room)));
      setModalOpen(false);
    }
  };

  const handleDeleteRoom = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kamar ini?')) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const handleTypeChange = (type: string) => {
    const selectedType = roomTypes.find(room => room.type === type);
    setNewRoom({ ...newRoom, type, price: selectedType ? selectedType.price : 0 });
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-xl mt-10 flex flex-col gap-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Room Management</h1>
      <input
        type="text"
        placeholder="Cari nama atau tipe kamar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-white"
      />
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mb-4">
        <input type="text" placeholder="Nama Kamar" value={newRoom.name} onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })} className="p-3 border rounded-lg shadow-sm text-black" />
        <select value={newRoom.type} onChange={(e) => handleTypeChange(e.target.value)} className="p-3 border rounded-lg shadow-sm text-black">
          <option value="">Pilih Tipe</option>
          {roomTypes.map(room => (
            <option key={room.type} value={room.type}>{room.type}</option>
          ))}
        </select>
        <input type="text" placeholder="Harga" value={formatRupiah(newRoom.price)} disabled className="p-3 border rounded-lg shadow-sm bg-gray-200 text-black" />
        <button onClick={handleAddRoom} className="bg-green-500 text-white p-3 rounded-lg shadow-lg hover:bg-green-700 transition">Tambah</button>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {paginatedRooms.map(room => (
          <div key={room.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-black">
            <h2 className="text-xl font-semibold flex items-center gap-2"><FaBed /> {room.name}</h2>
            <p className="text-gray-600 flex items-center gap-2"><FaMoneyBillWave /> {formatRupiah(room.price)}/malam</p>
            <p className={`text-sm font-bold flex items-center gap-2 ${room.availability ? 'text-green-500' : 'text-red-500'}`}>
              {room.availability ? <FaCheckCircle /> : <FaTimesCircle />} {room.availability ? 'Available' : 'Booked'}
            </p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => handleEditRoom(room)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">Edit</button>
              <button onClick={() => handleDeleteRoom(room.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Hapus</button>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && editingRoom && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-lg font-bold mb-4">Edit Room</h2>
            <input type="text" value={editingRoom.name} onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })} className="border p-2 w-full mb-2" />
            <button onClick={handleUpdateRoom} className="bg-blue-500 text-white p-2 rounded w-full">Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
