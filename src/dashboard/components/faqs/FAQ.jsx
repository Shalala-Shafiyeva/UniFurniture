import React from 'react'
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

function FAQ() {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div className="layoutSidenav d-flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="container-fluid mt-5">
          <main>
            <div className="row">
              <div className="col-8 p-4">
                <h2>FAQs page</h2>
                <h3>Create a new FAQ</h3>
                <form
                  className="col-12 border p-4 d-flex flex-column gap-3"
                  method="POST"
                >
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Title of banner</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="titleHelp"
                        placeholder="Enter title"
                        // value={values.title}
                        // onChange={(e) => {
                        //   setValues({ ...values, title: e.target.value });
                        // }}
                        name="title"
                      />
                    </div>
                    {/* {errors.title && (
                      <p className="text-danger">{errors.title}</p>
                    )} */}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="content">Content of banner</label>
                      {/* <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setContent(data);
                        }}
                        name="content"
                      /> */}
                    </div>
                    {/* {errors.content && (
                      <p className="text-danger">{errors.content}</p>
                    )} */}
                  </div>
                  <div>
                    <div className="form-group">
                      <label htmlFor="image">Image of banner</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        aria-describedby="imageHelp"
                        // onChange={(e) => {
                        //   setValues({ ...values, image: e.target.files[0] });
                        // }}
                        name="image"
                      />
                    </div>
                    {/* {errors.image && (
                      <p className="text-danger">{errors.image}</p>
                    )} */}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
            <div className="row p-4">
              <h2>Banners of About page</h2>
              {/* {banners?.length == 0 ? (
                <p>No banner found</p>
              ) : ( */}
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <td scope="col">Title</td>
                      <td scope="col">Content</td>
                      <td scope="col">Image</td>
                      <td scope="col">Publish</td>
                      <td scope="col">Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {banners.map((banner) => (
                      <tr key={banner.id}>
                        <td>{banner.title}</td>
                        <td>{banner.content}</td>
                        <td>
                          <img
                            width="100"
                            src={`http://localhost:8000/storage/${banner.image}`}
                            alt="Banner"
                          />
                        </td>
                        <td>
                          {banner.is_publish ? "published" : "not published"}
                        </td>
                        <td className="d-flex gap-2">
                          <Link
                            className="btn btn-primary"
                            to={`/dashboard/about/banner/edit/${banner.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(banner.id)}
                          >
                            Delete
                          </button>
                          {!banner.is_publish && (
                            <button
                              className="btn btn-success"
                              onClick={() => handlePublishBanner(banner.id)}
                            >
                              Publish
                            </button>
                          )}
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              {/* )} */}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default FAQ