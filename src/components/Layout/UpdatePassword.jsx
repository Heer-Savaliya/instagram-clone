import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../firebaseConfig';

const UpdatePassword = () => {
  const { userData, loading } = useContext(UserContext);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill out all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match.");
      return;
    }

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success('Password updated successfully!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to update password. Please check your current password.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="px-4 sm:px-6 md:px-10 py-10">
      <ToastContainer position="top-right" />
      <div className="max-w-xl mx-auto shadow-lg bg-white p-6 sm:p-10 rounded-lg">
        <h1 className="text-center pb-5 text-2xl font-semibold text-gray-700">Update Password</h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 font-medium">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 w-full rounded-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 w-full rounded-md"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="p-2 mt-1 border border-gray-300 w-full rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-md font-semibold hover:opacity-90 transition-all duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
