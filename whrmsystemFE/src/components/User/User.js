import { useEffect, useState, useContext } from "react";
import { getAllUser, deleteUser } from "../../services/userService";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalUser from "./ModalUser";
import ModalDelete from "./ModalDelete";
import { UserContext } from "../Context/Context";
import userAvatar from '../../assets/user-avatar.png'

const User = (props) => {
    // Data
    const [listUser, setListUser] = useState([])

    // Pagination
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(8)
    const [offset, setOffset] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    // Confirm Delete
    const [isShowConfirmDelete, setIsShowConfirmDelete] = useState(false)
    const [dataModalDelete, setDataModal] = useState({})

    // Confirm Create and Update
    const [isShowCreate, setisShowCreate] = useState(false)
    const [isShowModal, setIsShowModal] = useState("UPDATE")
    const [dataModalUpdate, setDataModalUpdate] = useState({})

    const { user } = useContext(UserContext)

    const fetchData = async () => {
        let res = await getAllUser(page, limit)
        if (res.EC === "1") {
            setTotalPage(res.DT.totalPage)
            setOffset(res.DT.offset)
            setListUser(res.DT.users)
        } else {
            toast.error(res.EM)
        }
    }

    useEffect(() => {
        fetchData()
    }, [page, limit])


    // Handle paginations
    const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }

    const handleSetLimit = (event) => {
        setLimit(event)
        setPage(1)
    }


    // Delete
    const showConfirmDelete = (user) => {
        setIsShowConfirmDelete(true)
        setDataModal(user)
    }

    const hideConfirmDelete = () => {
        setIsShowConfirmDelete(false)
        setDataModal({})
    }

    const handleDeleteUser = async () => {
        if (dataModalDelete) {
            let res = await deleteUser(dataModalDelete.id)
            if (res.EC === "1") {
                setIsShowConfirmDelete(false)
                await fetchData()
                toast.success("Delete user successfully!")
            } else {
                setIsShowConfirmDelete(false)
                toast.error(res.EM)
            }

        } else {
            setIsShowConfirmDelete(false)
            await fetchData()
            toast.error("Can't delete user, please try again!")
        }
    }


    // Create
    const showCreate = () => {
        setisShowCreate(true)
        setIsShowModal("CREATE")
    }

    const hideCreate = () => {
        setDataModalUpdate({
            email: "",
            password: "",
            phone: "",
            avatar: "",
            username: "",
            address: "",
            gender: "Male",
            group: ""
        })
        setisShowCreate(false)
    }


    //Update
    const showUpdate = (user) => {
        setDataModalUpdate(user)
        setIsShowModal("UPDATE")
        setisShowCreate(true)
    }

    const handleRefresh = async () => {
        await fetchData()
    }


    return (
        <>
            <div className="content-card-body">
                <div className="row align-items-center">
                    <div className="col-12 d-flex justify-content-center col-sm-4 d-sm-flex justify-content-sm-start">
                        <span className="fs-4 fw-bold text-info"><i className="fa fa-user"></i> User</span>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-2 col-sm-8 d-sm-flex justify-content-sm-end mt-sm-0 gap-2">
                        <button className="btn btn-success" onClick={() => { showCreate() }}><i className="fa fa-plus-circle"></i> Add</button>
                        <button className="btn btn-primary" onClick={() => handleRefresh()}><i className="fa fa-refresh"></i> Refresh</button>
                    </div>
                </div>

                <hr />

                <div className="table-responsive" style={{ minHeight: '495px' }}>
                    <table className="table table-striped table-hover">
                        <thead className="">
                            <tr className="text-nowrap">
                                <th scope="col">No</th>
                                <th scope="col">Avatar</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Group</th>
                                <th scope="col">Type</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 ? listUser.map((item, index) => {
                                return (
                                    <tr key={"row" + index} className="text-nowrap">
                                        <td className={user.id === item.id ? 'text-primary fw-medium' : ''}>{index + 1 + offset}</td>
                                        <td className={user.id === item.id ? 'text-primary fw-medium' : ''}>
                                            <img src={item.avatar ? process.env.REACT_APP_URL_FILES_BE + item.avatar : userAvatar} style={{ width: '35px', height: '35px', borderRadius: '50%' }} alt={`avatar${index}`} />
                                        </td>
                                        <td className={user.id === item.id ? 'text-primary fw-medium' : ''}>{item.username ? item.username : ''}</td>
                                        <td className={user.id === item.id ? 'text-primary fw-medium' : ''}>{item.email ? item.email : ''}</td>
                                        <td className={user.id === item.id ? 'text-primary fw-medium' : ''}>{item.phone ? item.phone : ''}</td>
                                        <td className={user.id === item.id ? 'text-primary fw-medium' : ''}>{item.Group ? item.Group.name : 'None'}</td>
                                        <td className={user.id === item.id ? 'text-primary fw-medium' : ''}>{item.typeAccount ? item.typeAccount : ''}</td>
                                        <td>
                                            {
                                                user.id === item.id || (item.Group && item.Group.name === user.data.name) ? <><button className="btn opacity-0">.</button></>
                                                    :
                                                    <div className="text-nowrap">
                                                        <button className="btn btn-warning text-white mx-2" onClick={() => showUpdate({ ...item, group: item.Group ? item.Group.id : null, gender: item.gender ? item.gender : 'Others' })}><i className="fa fa-pencil-square-o"></i></button>
                                                        <button className="btn btn-danger" onClick={() => showConfirmDelete(item)}><i className="fa fa-trash-o"></i></button>
                                                    </div>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                                : <tr>
                                    <td colSpan={8} className="text-center">No users available.....</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

                {
                    totalPage > 0 &&
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-center mt-2 col-md-6 d-md-flex justify-content-md-start mt-md-0 gap-2">
                            <label className="fw-medium">Limit records: </label>
                            <select className="form-select-sm"
                                value={limit}
                                onChange={(event) => handleSetLimit(event.target.value)}
                            >
                                <option value={8}>8</option>
                                <option value={16}>16</option>
                            </select>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-center mt-2 col-md-6 d-md-flex justify-content-md-end mt-md-2">
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={1}
                                marginPagesDisplayed={1}
                                pageCount={totalPage}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                                forcePage={page - 1}
                            />
                        </div>
                    </div>
                }
            </div>

            <ModalUser
                show={isShowCreate}
                hideCreate={hideCreate}
                showModal={isShowModal}
                dataModalUpdate={dataModalUpdate}
                fetchData={fetchData}
            />

            <ModalDelete
                show={isShowConfirmDelete}
                hideConfirm={hideConfirmDelete}
                handleDeleteUser={handleDeleteUser}
                dataModal={dataModalDelete.username}
                title={'user'}
            />
        </>
    )
}
export default User;