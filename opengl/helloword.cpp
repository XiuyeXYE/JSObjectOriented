// #include<windows.h>
// #include<gl/GL.h>
#include "../3lib/glfw-3.3.bin.WIN64/include/GLFW/glfw3.h"
#pragma comment(lib, "..\\3lib\\glfw-3.3.bin.WIN64\\lib-vc2015\\glfw3dll.lib")
#pragma comment(lib, "GLU32.lib")

int main(void)
{
    GLFWwindow *window;

    /* Initialize the library */
    if (!glfwInit())
        return -1;

    /* Create a windowed mode window and its OpenGL context */
    window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
    if (!window)
    {
        glfwTerminate();
        return -1;
    }

    /* Make the window's context current */
    glfwMakeContextCurrent(window);

    /* Loop until the user closes the window */
    while (!glfwWindowShouldClose(window))
    {
        /* Render here */
        glClear(GL_COLOR_BUFFER_BIT);

        /* Swap front and back buffers */
        glfwSwapBuffers(window);

        /* Poll for and process events */
        glfwPollEvents();
    }

    glfwTerminate();
    return 0;
}
