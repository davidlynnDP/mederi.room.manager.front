import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';

import { MederiContext } from '../../../context';
import { MederiLayout } from '../../layout'
import { RoomType } from '../../../domain/enums';

interface Resources {
  name: string;
  category: string;
  description: string;
}

interface Values {
  name: string;
  capacity: number;
  location: string;
  roomType: RoomType;
  resources: Resources[];
}

export const RoomCreatePage = () => {

  const navigate = useNavigate();
  const { createRoom } = useContext( MederiContext );

  const { handleSubmit, errors, touched, getFieldProps, values, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      capacity: 1,
      location: '',
      roomType: RoomType.REUNION,
      resources: [
        {
          name: '',
          category: '',
          description: '',
        },
      ],
    },
    onSubmit: async(values: Values) => {
      await createRoom(values);
      navigate('/rooms');
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre de la sala es obligatorio'),
      capacity: Yup.number().min(1, 'La capacidad de la sala debe ser al menos 1').required('La capacidad es obligatoria'),
      location: Yup.string().required('La ubicación es obligatoria'),
      roomType: Yup.mixed<RoomType>().oneOf(Object.values(RoomType), 'Tipo de sala no válido').required('El tipo de sala es obligatorio'),
      resources: Yup.array()
        .of(
          Yup.object({
            name: Yup.string().required('El nombre del recurso es obligatorio'),
            category: Yup.string().required('La categoría del recurso es obligatoria'),
            description: Yup.string().required('La descripción del recurso es obligatoria'),
          })
        )
        .min(1, 'Debe agregar al menos un recurso')
        .required('Los recursos son obligatorios'),
    }),
  });

  const addNewItem = () => {
    setFieldValue('resources', [
      ...values.resources,
      {
        name: '',
        category: '',
        description: '',
      },
    ]);
  };

  const removeItem = (index: number) => {
    const updatedItems = values.resources.filter((_, i) => i !== index);
    setFieldValue('resources', updatedItems);
  };
  
  return (
    <MederiLayout>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-[#F05A03] mb-6">Crear Sala</h1>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-[#F05A03] font-semibold">Nombre de la Sala</label>
            <input
              type="text"
              {...getFieldProps('name')}
              className={`w-full p-2 border ${
                touched.name && errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {touched.name && errors.name ? (
              <div className="text-red-500">{errors.name}</div>
            ) : null}
          </div>

          {/* Capacidad */}
          <div className="mb-4">
            <label className="block text-[#F05A03] font-semibold">Capacidad</label>
            <input
              type="number"
              {...getFieldProps('capacity')}
              className={`w-full p-2 border ${
                touched.capacity && errors.capacity ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {touched.capacity && errors.capacity ? (
              <div className="text-red-500">{errors.capacity}</div>
            ) : null}
          </div>

          {/* Ubicación */}
          <div className="mb-4">
            <label className="block text-[#F05A03] font-semibold">Ubicación</label>
            <input
              type="text"
              {...getFieldProps('location')}
              className={`w-full p-2 border ${
                touched.location && errors.location ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {touched.location && errors.location ? (
              <div className="text-red-500">{errors.location}</div>
            ) : null}
          </div>

          {/* Tipo de Sala */}
          <div className="mb-4">
            <label className="block text-[#F05A03] font-semibold">Tipo de Sala</label>
            <select
              {...getFieldProps('roomType')}
              className={`w-full p-2 border ${
                touched.roomType && errors.roomType ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            >
              <option value={RoomType.REUNION}>Reunión</option>
              <option value={RoomType.CONFERENCIA}>Conferencia</option>
              <option value={RoomType.FORMACION}>Formación</option>
              <option value={RoomType.AULA}>Aula</option>
            </select>
            {touched.roomType && errors.roomType ? (
              <div className="text-red-500">{errors.roomType}</div>
            ) : null}
          </div>

          {/* Recursos */}
          {values.resources.map((_, index) => (
            <div key={index} className="mb-4 border border-gray-200 p-4 rounded relative">
              <h3 className="text-[#F05A03] font-semibold mb-2">Recurso #{index + 1}</h3>

              <div className="mb-2">
                <label className="block text-gray-600">Nombre del Recurso</label>
                <input
                  type="text"
                  {...getFieldProps(`resources[${index}].name`)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-600">Categoría del Recurso</label>
                <input
                  type="text"
                  {...getFieldProps(`resources[${index}].category`)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-600">Descripción del Recurso</label>
                <input
                  type="text"
                  {...getFieldProps(`resources[${index}].description`)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out mt-2 mr-2"
              >
                Eliminar
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewItem}
            className="w-full p-2 bg-[#F57931] text-white font-bold hover:bg-[#F05A03] rounded mb-4"
          >
            Añadir Recurso
          </button>

          <button
            type="submit"
            className="w-full p-2 bg-[#F05A03] text-white font-bold hover:bg-[#F57931] rounded"
          >
            Crear Sala
          </button>
        </form>
      </div>
    </MederiLayout>
  );
}